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
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const interval = setInterval(updateLocation, 5000);
    return () => clearInterval(interval);
  }, [locations]);

  function updateLocation() {
    // let array = [].concat(locations)
    // array.push([-122.39851786165565, 37.78736425435588])
    // setLocations(array);

    axios.get('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response => {
      let array = [].concat(locations)
      array.push([response.data.longitude, response.data.latitude])
      setLocations(array);
    });
  }

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