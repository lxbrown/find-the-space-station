import MapGL from 'react-map-gl';
import env from "react-dotenv";
import { useState } from 'react';
import Immutable from 'immutable';
import ScatterplotOverlay from './overlay/scatterplot-overlay';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 42,
    longitude: -90,
    zoom: 2,
  });
  const locations = Immutable.fromJS([
    [-122.39851786165565, 37.78736425435588],
    [-122.40015469418074, 37.78531678199267],
    [-122.4124101516789, 37.80051001607987],
  ])

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={env.MAPBOX_ACCESS_TOKEN}>
      <ScatterplotOverlay
        locations={locations}
        dotRadius={10}
        globalOpacity={0.8}
        compositeOperation="lighter"
        dotFill="#00a8fe"
        renderWhileDragging={true}
      />
    </MapGL>
  );
}

export default App;