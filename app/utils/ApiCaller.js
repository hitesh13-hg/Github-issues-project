/**
 * Created by Manoj on 17/8/17.
 */
import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';
import requestConfig from '../config/request';
// import appConfig from '../config/app';

// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveToLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignoring write error as of now
  }
};

export const clearFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
};

function getRequestConfig(isFileUpload) {
  // const dataOrgId = (process.env.NODE_ENV === 'production') ? appConfig.production.data_org_id : appConfig.development.data_org_id;
  const config = requestConfig;
  const token = getFromLocalStorage('token');
  const orgID = getFromLocalStorage('orgID');
  const user = getFromLocalStorage('user');
  if (isFileUpload) {
    config.headers['Content-Type'] = '';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  if (user && user.refID) {
    config.headers['X-CAP-REMOTE-USER'] = user.refID;
  }
  if (process.env.NODE_ENV !== 'production' && orgID !== undefined) {
    config.headers['X-CAP-API-AUTH-ORG-ID'] = orgID;
  }
  // config.headers['x-cap-api-data-context-org-id'] = orgID === 0 ? dataOrgId : orgID;
  if (process.env.NODE_ENV !== 'production' && token !== undefined) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (process.env.NODE_ENV === 'production') {
    config.credentials = 'same-origin';
  }

  return config;
}

export const get = (url, params) => {
  const config = getRequestConfig();
  config.params = params;
  const source = CancelToken.source();
  config.cancelToken = source.token;
  const request = axios.get(url, config);
  request[CANCEL] = () => source.cancel();
  return request;
};

export const post = (url, data, isFileUpload = false) => {
  const config = getRequestConfig(isFileUpload);
  const source = CancelToken.source();
  config.cancelToken = source.token;
  const request = axios.post(url, isFileUpload ? data : JSON.stringify(data), config);
  request[CANCEL] = () => source.cancel();
  return request;
};

export const put = (url, data) => {
  const config = getRequestConfig();
  const source = CancelToken.source();
  config.cancelToken = source.token;
  const request = axios.put(url, JSON.stringify(data), config);
  request[CANCEL] = () => source.cancel();
  return request;
};

export const deleteResource = (url) => {
  const config = getRequestConfig();
  const request = axios.delete(url, config);
  return request;
};
