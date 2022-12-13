import axios from 'axios';
import { getAuthLocalStorage } from './utilities';
import { appConfigurations } from './constants';

export function jwtInterceptor() {
  axios.interceptors.request.use(request => {
    const { tokens } = getAuthLocalStorage();
    const requestUrl = new URL(request.url);
    const requestBaseUrl = `${requestUrl.protocol}//${requestUrl.hostname}`;
    const isApiUrl = requestBaseUrl === appConfigurations.apiBaseUrl;
    const isAuthPath = requestUrl.pathname.startsWith('/auth');

    if (tokens && isApiUrl && !isAuthPath) {
      request.headers.common.Authorization = `Bearer ${tokens.access.token}`;
    }

    return request;
  });
}
