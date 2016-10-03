# Wikispeed

[![travis][travis-img]][travis-url]
[![circle][circle-img]][circle-url]
[![issues][issues-img]][issues-url]
[![license][license-img]][license-url]
[![validation][validation-img]][validation-url]

[travis-url]: https://travis-ci.org/waldyrious/wikispeed
[travis-img]: https://img.shields.io/travis/waldyrious/wikispeed/gh-pages.svg?label=travis%20build
[circle-url]: https://circleci.com/gh/waldyrious/wikispeed
[circle-img]: https://img.shields.io/circleci/project/waldyrious/wikispeed/gh-pages.svg?label=circleci%20build
[issues-url]: https://github.com/waldyrious/wikispeed/issues
[issues-img]: http://img.shields.io/github/issues/waldyrious/wikispeed.svg
[license-url]: https://github.com/waldyrious/wikispeed/blob/gh-pages/LICENSE.md
[license-img]: https://img.shields.io/github/license/waldyrious/wikispeed.svg
[validation-url]: https://validator.w3.org/nu/?doc=http%3A%2F%2Fwaldyrious.net%2Fwikispeed%2F
[validation-img]: https://img.shields.io/badge/w3c-valid_xhtml5-blue.svg

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
