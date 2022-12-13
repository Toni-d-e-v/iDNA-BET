import { appConfigurations } from './constants';

export const getAuthLocalStorage = () => {
  const stringTokens = localStorage.getItem(appConfigurations.localStorageTokensKey);
  const stringUser = localStorage.getItem(appConfigurations.localStorageUserKey);
  const tokens = stringTokens && JSON.parse(stringTokens);
  const user = stringUser && JSON.parse(stringUser);
  return { tokens, user };
};

export const setAuthLocalStorage = (tokens, user) => {
  if (tokens != null) {
    localStorage.setItem(appConfigurations.localStorageTokensKey, tokens);
  }
  if (user != null) {
    localStorage.setItem(appConfigurations.localStorageUserKey, user);
  }
};

export const removeAuthLocalStorage = () => {
  localStorage.removeItem(appConfigurations.localStorageTokensKey);
  localStorage.removeItem(appConfigurations.localStorageUserKey);
};

export const getExpiresCurrentUnixMilli = expires => {
  const expiresUnixMilli = new Date(expires).getTime();
  const currentUnixMilli = new Date().getTime();
  return { expiresUnixMilli, currentUnixMilli };
};

export const truncateAddress = address => {
  return `${address.slice(0, 4)}...${address.slice(-2)}`;
};
