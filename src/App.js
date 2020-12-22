import MapGL from 'react-map-gl';
import env from "react-dotenv";
import { useEffect, useState } from 'react';
import ScatterplotOverlay from './overlay/scatterplot-overlay';
import axios from 'axios';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });
  const [positions, setPositions] = useState([])

  useEffect(() => {
    let positionFeed = [];

    function updatePosition() {
      // setPositions([]);
      // if (positionFeed.length === 0) {
      //   positionFeed.push([-122, 37]);
      // }
      // else {
      //   positionFeed.push([-122 + positionFeed.length, 37]);
      // }
      // setPositions(positionFeed);

      axios.get('https://api.wheretheiss.at/v1/satellites/25544')
      .then(response => {
        setPositions([]);
        positionFeed.push([response.data.longitude, response.data.latitude]);
        setPositions(positionFeed);
      });
    };

    updatePosition();
    const interval = setInterval(updatePosition, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={env.MAPBOX_ACCESS_TOKEN}>
      <ScatterplotOverlay
        locations={positions}
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