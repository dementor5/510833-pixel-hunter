import {SERVER_URL, APP_ID} from './settings';

const DEFAULT_NAME = `Incognito`;

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    checkStatus(response);
    return toJSON(response);
  }

  static async loadResults(userName = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${userName}`);
    checkStatus(response);
    return toJSON(response);
  }

  static async saveResults(data, userName = DEFAULT_NAME) {
    const settings = {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify(data),
    };
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${userName}`, settings);
    return checkStatus(response);
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

