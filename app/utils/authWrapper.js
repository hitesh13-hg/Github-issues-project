/**
 * Created by Meharaj on 22/jan/2019
 */
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { makeSelectCap } from '../containers/Cap/selectors';
const orginUrl = window.location.origin;

const getIsLoggedIn = () => {
  let isLoggedIn = false;
  debugger;
  if (process.env.NODE_ENV === "production" && JSON.parse(window.localStorage.getItem('isLoggedIn'))) {
    isLoggedIn = true;
    console.log("Auth wrapper production", isLoggedIn);
  } else if (localStorage.getItem("token")) {
    isLoggedIn = true;
    console.log("Auth wrapper development", isLoggedIn);
  }
  return isLoggedIn;
};
const locationHelper = locationHelperBuilder({})

// Take the regular authentication & redirect to login from before
export const UserIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: makeSelectCap(),
  // authenticatingSelector: makeSelectUserLoading(),
  allowRedirectBack: false,
  predicate: () => getIsLoggedIn(),
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectPath: `${orginUrl}/login`,
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  authenticatedSelector: makeSelectCap(),//makeSelectCap(),
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: () => !getIsLoggedIn(),
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/campaigns',
  allowRedirectBack: false,
});
