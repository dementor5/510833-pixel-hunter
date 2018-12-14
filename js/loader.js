import {SERVER_URL} from './settings';

export default class Loader {
  static loadData() {
    return fetch(SERVER_URL)
    .then(checkStatus)
    .then(toJSON);
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

function toJSON(res) {
  return res.json();
}

