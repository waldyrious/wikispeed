var editsFeed = io.connect('stream.wikimedia.org/rc');  
var gaugeNodes = document.getElementsByClassName('gauge');
var beginTimestamp = Date.now()/1000;
var counterPeriod = 60; // 60 seconds --> we'll displays edits per minute
var editsInLastMinute = {}; // List of arrays containing the timestamps of recent edits per wiki
var gaugeCharts = {}; // List of charts

//##########################################################################
//                              SET UP CHARTS
//##########################################################################
for(var i=0; i<gaugeNodes.length; i++) // for(elem of gaugeNodes) doesn't seem to work on Chrome...
{
    // Initialize arrays, so we can push to them
    editsInLastMinute[ gaugeNodes[i].id ] = [];

    // Set up each gauge chart, with larger units for the global one
    var scale = ( gaugeNodes[i].id == "global" ) ? 10 : 1;
    gaugeCharts[ gaugeNodes[i].id ] = new Highcharts.Chart({
        chart: {
            type: 'gauge',
            renderTo: gaugeNodes[i].id
        },
        title: {
            text: gaugeNodes[i].title
        },
        subtitle: {
            text: gaugeNodes[i].lang
        },
        tooltip: {
            enabled: false
        },
        pane: {
            startAngle: -150,
            endAngle: 150
        },
        // The Y (value) axis. Note: a gauge chart has no X axis.
        yAxis: {
            min: 1*scale,
            max: 600*scale,
            minorTickColor: '#777',
            minorTickInterval: 0.1,
            tickPositions: [Math.log(1*scale)/Math.log(10),
                            Math.log(3*scale)/Math.log(10),
                            Math.log(6*scale)/Math.log(10),
                            Math.log(10*scale)/Math.log(10),
                            Math.log(30*scale)/Math.log(10),
                            Math.log(60*scale)/Math.log(10),
                            Math.log(100*scale)/Math.log(10),
                            Math.log(300*scale)/Math.log(10),
                            Math.log(600*scale)/Math.log(10)
                           ],
            minorTickLength: 9+scale,
            tickLength: 9+scale,
            endOnTick: true,
            tickColor: '#666',
            labels: {
                style: {
                    fontSize: (scale > 1 ? 16 : 8) + 'px'
                },
                distance: (scale > 1 ? -40 : -20)
            },
            type: 'logarithmic',
            title: scale > 1 ? { text: 'edits/min' } : null,
            plotBands: [{
                from: 1*scale, // In log scale, minumum can't be zero
                to: 60*scale, // 1 (or 10) per second
                color: 'YellowGreen', // Green
                thickness: 9+scale
            }, {
                from: 60*scale,
                to: 300*scale, // 5 (or 50) per second
                color: 'Gold', // Yellow
                thickness: 9+scale
            }, {
                from: 300*scale,
                to: 600*scale, // 10 (or 100) per second
                color: 'Salmon', // Red
                thickness: 9+scale
            }]
        },
        plotOptions: {
            gauge: {
                dial: {
                    baseWidth: 10+scale,
                    topWidth: 1,
                    baseLength: '0%', // location along radius where it starts narrowing
                    rearLength: '0%' // don't project back, start at center
                },
                pivot: {
                    radius: (10+scale)/2
                }
            }
        },
        // Only one data series, initialized with the minimum allowed value
        series: [{
            name: 'edits per minute',
            data: [1*scale],
            dataLabels: {
                backgroundColor: 'white',
                y: -15,
                style: {
                    fontSize: (scale > 1 ? 30 : 15) + 'px'
                },
                zIndex: 3
            }
        }],
        credits: {
            enabled: (scale != 1), // Only show credits in the large gauge
            position: {
                align: 'center',
                x: 0
            }
        }
    });
}

//##############################################################################
//                       SET UP WEBSOCKET
//##############################################################################

editsFeed.on('connect', function() {
    // Subscribe to one or more wikis
    // See https://wikitech.wikimedia.org/wiki/RCStream for more details
    editsFeed.emit('subscribe', '*');
    console.log('WebSocket info: user connected');
});

editsFeed.on('change', function( changeData ) {
    // See https://www.mediawiki.org/wiki/Manual:RCFeed#Properties
    // Use if(changeData.type == 'edit') to count only edits, rather than all activity
    if ( editsInLastMinute[ changeData.wiki ] !== undefined )
    {
        editsInLastMinute[ changeData.wiki ].push(changeData.timestamp);
    }
    if ( changeData.server_name.match("wikipedia") && editsInLastMinute[ "global" ] !== undefined )
    {
        editsInLastMinute["global"].push(changeData.timestamp);
    }
    //console.log(editsInLastMinute.length)
});

editsFeed.on('error', function( errorData ) {
    console.log( "WebSocket error: " + JSON.stringify(errorData) );
});

//##############################################################################
//                       SET UP UPDATING ROUTINE
//##############################################################################

function updateCounters(){
    var now = Date.now() / 1000;
    var elapsed = now - beginTimestamp;

    for(var id in editsInLastMinute)
    {
        var currentCount;
        if( elapsed < counterPeriod)
        {
            // Less than `counterPeriod` seconds passed since we started counting,
            // so we'll extrapolate from the data we've got so far.
            currentCount = Math.round(editsInLastMinute[id].length * counterPeriod / elapsed);
        }
        else
        {
            // Remove old data
            editsInLastMinute[id] = editsInLastMinute[id].filter( function (editTimestamp) {
                return editTimestamp > (now - counterPeriod);
            });
            // Get count of edits in the last `counterPeriod` seconds
            currentCount = editsInLastMinute[id].length;
        }
        if( gaugeCharts[id] != undefined )
        {
            // Each chart has a single series, with a single data point.
            // Note: zero is not allowed, as log(0) is mathematically undefined
            var min = ( id == "global" ) ? 10 : 1;
            gaugeCharts[id].series[0].points[0].update( Math.max(min, currentCount) ); 
        }
    }
}

// Start the update loop
var loopID = setInterval( updateCounters, 1000);

//##########################################################################
//                       CLEAN UP BEFORE EXITING
//##########################################################################

window.onbeforeunload = function(){
    editsFeed.socket.disconnect(); clearInterval(loopID);
};
