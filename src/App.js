import { useEffect, useState } from 'react';
import env from "react-dotenv";
import MapGL from 'react-map-gl';
import { useSnackbar } from 'react-simple-snackbar';

import IconOverlay from './overlay/icon';
import TitleOverlay from './overlay/title';
import TrailOverlay from './overlay/trail';

import { fetchCurrentPosition, fetchLastNPositions } from './dao';

const REFRESH_PERIOD = 5000; // ms
const MAX_FAILS = 4;
const LEAD_IN_COUNT = 10; // max is 10

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
    let positionFeed = positions;

    function savePosition(latitude, longitude) {
      failCount = 0;

      setPositions([]);
      positionFeed.push([longitude, latitude]);
      setPositions(positionFeed);
      if (positionFeed.length === 1) {
        setViewport({
          latitude: latitude,
          longitude: longitude,
          zoom: 2
        });
      }
    };

    let failCount = 0;
    function updatePosition() {
      closeSnackbar();

      fetchCurrentPosition()
        .then(response => {
          failCount = 0;

          savePosition(response.data.latitude, response.data.longitude)
        })
        .catch(() => {
          failCount++;
          if (failCount < MAX_FAILS) {
            openSnackbar("Error fetching ISS location. Trying " + (MAX_FAILS - failCount) + " more times.", REFRESH_PERIOD - 500);
          }
          else {
            openSnackbar("Repeated failure to fetch ISS location. Refresh the page later to try again.", 15000);
            setStopUpdates(true);
          }
        });
    };

    if (!stopUpdates) {
      fetchLastNPositions(LEAD_IN_COUNT, REFRESH_PERIOD)
      .then(response => {
        const timer = ms => new Promise(res => setTimeout(res, ms))

        async function leadIn () {
          for (var i = 0; i < response.data.length; i++) {
            savePosition(response.data[i].latitude, response.data[i].longitude);
            await timer(REFRESH_PERIOD / (LEAD_IN_COUNT * 5));
          }
        }

        leadIn();
      })

      const interval = setInterval(updatePosition, REFRESH_PERIOD);
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
        <TrailOverlay
          positions={positions.length > 0 ? positions : null}
        />
        <IconOverlay
          position={positions.length > 0 ? positions[positions.length - 1] : null}
        />
      </MapGL>
      <TitleOverlay />
    </>
  );
}

export default App;