# TODO

### MVP
Decide on a domain:
* If that doesn't work, buy something like findthespacestation.com

Wait until https://github.com/visgl/react-map-gl/issues/1266 is resolved. Can check off some v2 items in the meantime

If that issue isn't going to be resolved soon:
* Get prod build using map-test and map example webpack.config.js working
* Use that webpack.config here
* Test deploying using Firebase

Publish to domain + update version #

### V2
Add tail which tracks where it's been since page loaded

Display last 10 or so positions on initial page load

Allow tracking (page centers on ISS and tracks it)

Toggle satellite/map view

Use telemetry data to predict future path

Support for rendering sunlight

Prevent drawing from disappearing on page resize