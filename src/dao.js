import axios from 'axios';

const DEBUG = false;

let count = 0;
export function getCurrentPosition() {
    if (!DEBUG) { 
        return axios.get('https://api.wheretheiss.at/v1/satellites/25544');
    }
    else {
        return new Promise((resolve) => {
            count++;
            resolve({
                data: {
                    latitude: 37,
                    longitude: -122 + count
                }
            });
        });
    }
}