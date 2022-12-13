import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { sliceName as generalSliceName } from './reducer';
import { appConfigurations, actionNames } from './constants';
import { idenaAuthTokenInit, getTokens, logout, getUsers } from './async';
import { getAuthLocalStorage, setAuthLocalStorage, removeAuthLocalStorage } from './utilities';

function* processLogin({ payload: idenaAuthToken }) {
  try {
    const { tokens, user } = yield call(idenaAuthTokenInit, idenaAuthToken);
    setAuthLocalStorage(JSON.stringify(tokens), JSON.stringify(user));
    yield put({ type: actionNames[generalSliceName].updateTokensSecured, payload: true });
  } catch (e) {
    console.error(e);
    toast('Error logging in');
  }
}

function* processlogout() {
  try {
    const { tokens } = getAuthLocalStorage();
    removeAuthLocalStorage();
    if (!tokens?.refresh?.token) {
      throw new Error('Refresh Token missing with logout');
    }
    yield call(logout, tokens.refresh.token);
  } catch (e) {
    console.error(e);
    toast('Error logging out');
  } finally {
    yield put({ type: actionNames[generalSliceName].updateTokensSecured, payload: false });
    window.location.href = `${appConfigurations.localBaseUrl}`;
  }
}

function* refreshTokens() {
  try {
    const { tokens } = getAuthLocalStorage();
    if (!tokens?.refresh?.token) {
      throw new Error('Refresh Token missing with refresh');
    }
    const newTokens = yield call(getTokens, tokens.refresh.token);
    setAuthLocalStorage(JSON.stringify(newTokens), null);
  } catch (e) {
    removeAuthLocalStorage();
    yield put({ type: actionNames[generalSliceName].updateTokensSecured, payload: false });
    console.error(e);
  }
}

function* getData() {
  try {
    const users = yield call(getUsers);
    if (!users) {
      throw new Error('Missing users data');
    }
    yield put({ type: actionNames[generalSliceName].updateData, payload: { users } });
  } catch (e) {
    console.error(e);
  }
}

function* appRootSaga() {
  yield takeLatest(actionNames.processLogin, processLogin);
  yield takeLatest(actionNames.processlogout, processlogout);
  yield takeLatest(actionNames.refreshTokens, refreshTokens);
  yield takeLatest(actionNames.getData, getData);
}

export default appRootSaga;
