/**
 * Created by Meharaj on 22/jan/2019
 */
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { makeSelectUser, makeSelectUserLoading } from '../containers/Cap/selectors';
import Loading from '../components/Loading'
const orginUrl = window.location.origin;
import config from '../config/app';

const getIsLoggedIn = () => {
  let isLoggedIn = false;
  if (process.env.NODE_ENV === "production" && JSON.parse(window.localStorage.getItem('isLoggedIn'))) {
    isLoggedIn = true;
    console.log("Auth wrapper production", isLoggedIn);
  } else if (localStorage.getItem("token")) {
    isLoggedIn = true;
    console.log("Auth wrapper development", isLoggedIn);
  }
  return isLoggedIn;
};
const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector: makeSelectUser(),
  wrapperDisplayName: 'UserIsAuthenticated',
}

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login',
  // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/campaigns',
});



const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: makeSelectUser(),
  wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults
);

const redirectUrl = process.env.NODE_ENV === 'production' ? config.production.dashboard_url : config.development.dashboard_url;

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  // redirectPath: '/login',
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || redirectUrl,
  allowRedirectBack: false,
});

// Take the regular authentication & redirect to login from before
// export const UserIsAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: makeSelectUser(),
//   authenticatingSelector: makeSelectUserLoading(),
//   allowRedirectBack: false,
//   predicate: () => getIsLoggedIn(),
//   wrapperDisplayName: 'UserIsAuthenticated',
//   redirectPath: `${orginUrl}/login`,
// });
//
// export const UserIsNotAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: makeSelectUser(),//makeSelectCap(),
//   wrapperDisplayName: 'UserIsNotAuthenticated',
//   predicate: () => !getIsLoggedIn(),
//   redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/campaigns',
//   allowRedirectBack: false,
// });
