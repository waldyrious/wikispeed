[![Travis](https://img.shields.io/travis/waldyrious/wikispeed/gh-pages.svg)](https://travis-ci.org/waldyrious/wikispeed)
[![Circle](https://img.shields.io/circleci/project/waldyrious/wikispeed/gh-pages.svg)](https://circleci.com/gh/waldyrious/wikispeed)

# Wikispeed
A visualization of the rate of edits to Wikipedia in various languages.

This is essentially a replica of the original **[Wikipulse](http://wikipulse.herokuapp.com)**,
created in 2011 by [Ed Summers](http://mith.umd.edu/people/person/ed-summers/),
but using the new [Recent Changes stream](https://www.mediawiki.org/wiki/API:Recent_changes_stream)
over [websockets](https://en.wikipedia.org/wiki/WebSocket), instead of the old
[Recent Changes IRC feeds](https://meta.wikimedia.org/wiki/IRC/Channels#Recent_changes).
This allows for a more convenient and completely server-less setup.

Besides the backend change, a functional difference from Wikipulse
is that Wikispeed uses a logarithmic scale in the gauge charts,
which allows for a better visualization of the wide range of editing rates
of the various projects. (See https://github.com/edsu/wikipulse/issues/13)

## Credits / thanks:
- Ed Summers for [Wikipulse](http://wikipulse.herokuapp.com/)
- Krinkle for the [RCFeed demo code](http://codepen.io/Krinkle/pen/laucI/)
- WMF devs for providing the [RCFeed](https://www.mediawiki.org/wiki/API:Recent_changes_stream) service
- HighCharts for their wonderful [charts library](http://www.highcharts.com/)

## See also
You might be interested in these similar projects
that also visualize real-time edits to Wikimedia projects:

- [Wikistream](http://wikistream.wmflabs.org/)
- [Listen to Wikipedia](http://listen.hatnote.com/)
- [Recent Changes map](http://rcmap.hatnote.com/) and [Wikipedia Vision](http://www.lkozma.net/wpv/)
