# TODO
Allow trail to render on both sides of the map (wrap)

Display last 10 or so positions on initial page load
* Render the first 10 spots on the trail (historical ones) with opacity gradient
* Fade in the ISS using a similar opacity gradient (if possible)

Allow tracking (page centers on ISS and tracks it)

Add "themes"
* Dark theme has dark font, black/white ISS, light trail
* Light theme has light font, white/black ISS, dark trail
* Satellite theme has dark font, black/white ISS, light trail ??

Add theme selection to control panel

Update title font

Once https://github.com/visgl/react-map-gl/issues/1266 is resolved
* upgrade to 6.0.x of react-map-gl

Use telemetry data to predict future path

Move to independent domain, something like findthespacestation.com

Fix bug where a long tail causes rendering issues

Support for rendering sunlight

Prevent drawing from disappearing on page resize