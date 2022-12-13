import axios from 'axios';
import { call } from 'redux-saga/effects';
import { appConfigurations } from './constants';

export function* idenaAuthTokenInit(idenaAuthToken) {
  const loginResponse = yield call(axios.post, `${appConfigurations.apiBaseUrl}/auth/login`, { idenaAuthToken });
  if (loginResponse?.status !== 200 || !loginResponse?.data?.tokens) {
    throw new Error('Error logging into api');
  }
  return loginResponse.data;
}

export function* logout(refreshToken) {
  const loginResponse = yield call(axios.post, `${appConfigurations.apiBaseUrl}/auth/logout`, { refreshToken });
  if (loginResponse?.status !== 204) {
    throw new Error('Error logging out of api');
  }
  return loginResponse.data.tokens;
}

export function* getTokens(refreshToken) {
  const loginResponse = yield call(axios.post, `${appConfigurations.apiBaseUrl}/auth/refresh-tokens`, { refreshToken });
  if (loginResponse?.status !== 200 || !loginResponse?.data?.access || !loginResponse?.data?.refresh) {
    throw new Error('Error logging into api');
  }
  return loginResponse.data;
}

export function* getUsers() {
  const loginResponse = yield call(axios.get, `${appConfigurations.apiBaseUrl}/users`);
  if (loginResponse?.status !== 200 || !loginResponse?.data?.results) {
    throw new Error('Error getting users');
  }
  return loginResponse.data.results;
}
