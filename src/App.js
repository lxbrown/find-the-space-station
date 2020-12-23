import { useEffect, useState } from 'react';
import env from "react-dotenv";
import MapGL from 'react-map-gl';
import { useSnackbar } from 'react-simple-snackbar';

import ScatterplotOverlay from './overlay/scatterplot-overlay';
import Title from './title';
import { getCurrentPosition } from './dao';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });
  const [positions, setPositions] = useState([]);
  const [stopUpdates, setStopUpdates] = useState(false);
  const [openSnackbar, closeSnackbar] = useSnackbar();
  
  useEffect(() => {
    const waitTime = 5000;
    const maxFails = 4;

    let positionFeed = [];
    let failCount = 0;

    function updatePosition() {
      closeSnackbar();

      getCurrentPosition()
      .then(response => {
        failCount = 0;
        setPositions([]);
        positionFeed.push([response.data.longitude, response.data.latitude]);
        setPositions(positionFeed);
        if (positionFeed.length === 1) {
          setViewport({
            latitude: positionFeed[0][1],
            longitude: positionFeed[0][0],
            zoom: 2
          });
        }
      })
      .catch(() => {
        failCount++;
        if (failCount < maxFails) {
          openSnackbar("Error fetching ISS location. Trying " + (maxFails - failCount) + " more times.", waitTime-500);
        }
        else {
          openSnackbar("Repeated failure to fetch ISS location. Refresh the page later to try again.", 15000);
          setStopUpdates(true);
        }
      });
    };

    if (!stopUpdates) {
      updatePosition();
      const interval = setInterval(updatePosition, waitTime);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line
  }, [stopUpdates]);

  return (
    <>
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
      <Title/>
    </>
  );
}

export default App;