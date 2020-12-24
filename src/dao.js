import axios from 'axios';

let DEBUG = {
  active: false,
  starting_latitude: 37,
  starting_longitude: -122,
  count: 0
}

export function fetchCurrentPosition() {
  if (!DEBUG.active) {
    return axios.get('https://api.wheretheiss.at/v1/satellites/25544');
  }
  else {
    return new Promise((resolve) => {
      DEBUG.count++;
      resolve({
        data: {
          latitude: DEBUG.starting_latitude,
          longitude: DEBUG.starting_longitude + DEBUG.count
        }
      });
    });
  }
}

export function fetchLastNPositions(n, period) {
  if (!DEBUG.active) {
    let timestamps = [];
    const periodSeconds = Math.floor(period / 1000);
    const epochTime = Math.floor(new Date().getTime() / 1000);
    for (let timestamp = epochTime - (periodSeconds * n); timestamp < epochTime; timestamp += periodSeconds) {
      timestamps.push(timestamp)
    }
    return axios.get('https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + timestamps.join(','));
  }
  else {
    return new Promise((resolve) => {
      let data = [];
      for (let i = 0; i < n; i++) {
        DEBUG.count++;
        data.push({
          latitude: DEBUG.starting_latitude,
          longitude: DEBUG.starting_longitude + DEBUG.count
        });
      }
      resolve({data});
    });
  }

}