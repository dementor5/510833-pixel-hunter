import {SERVER_URL, APP_ID} from './settings';

const DEFAULT_NAME = `Incognito`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON);
  }

  static loadResults(userName = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${userName}`)
      .then(checkStatus)
      .then(toJSON);
  }

  static saveResults(data, userName = DEFAULT_NAME) {
    const requestSettings = {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify(data),
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${userName}`, requestSettings)
      .then(checkStatus);
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    throw new Error(response.status);
  }
}

function toJSON(res) {
  return res.json();
}

