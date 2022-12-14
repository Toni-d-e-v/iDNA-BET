/* eslint-disable no-undef */
import { sliceName as generalSliceName } from './reducer';

/**
 * App configurations
 */
export const appConfigurations = {
  localBaseUrl: process.env.REACT_APP_LOCAL_BASE_URL || 'https://i-bet.top',
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.i-bet.top',
  idenaSignInUrl: process.env.REACT_APP_IDENA_SIGN_IN_URL || 'https://app.idena.io/dna/signin',
  refreshExpirationDays: process.env.REACT_APP_JWT_REFRESH_EXPIRATION_DAYS || 30,
  refreshTokensMinutes: process.env.REACT_APP_JWT_REFRESH_MINUTES || 10,
  localStorageTokensKey: 'tokens',
  localStorageUserKey: 'user'
};

/**
 * Action Names
 */
export const actionNames = {
  // App level
  processLogin: 'processLogin',
  processlogout: 'processlogout',
  refreshTokens: 'refreshTokens',
  getData: 'getData',
  // General Slice
  [generalSliceName]: {
    updateTokensSecured: generalSliceName + '/updateTokensSecured',
    updateUser: generalSliceName + '/updateUser',
    updateData: generalSliceName + '/updateData',
    clearData: generalSliceName + '/clearData'
  }
};
