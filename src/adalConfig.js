import { AuthenticationContext, adalFetch, withAdalLogin } from "react-adal";

export const adalConfig = {
  tenant: process.env.REACT_APP_TENANT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_BASE_URL,
  endpoints: {
    api: process.env.REACT_APP_ENDPOINTS_API,
  },
  cacheLocation: "sessionStorage",
};

export const authContext = new AuthenticationContext(adalConfig);

export const getToken = () => authContext.getCachedToken(adalConfig.clientId);

export const getUser = () => authContext.getCachedUser();

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);
