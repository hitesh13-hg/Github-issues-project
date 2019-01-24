/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Cap from '../Cap';
import Login from '../Login';
import NotFoundPage from '../NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import config from '../../config/app';

import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
} from '../../utils/authWrapper';

const dashBoardUrl = process.env.NODE_ENV === 'production' ? config.production.dashboard_url : config.development.dashboard_url

export default function App() {
  // const LoginComp = userIsNotAuthenticatedRedir(Login);
  const Protected = userIsAuthenticatedRedir(Cap);
  return (
    <div>
      <Switch>
        <Route exact path={dashBoardUrl} component={Protected} />
        <Route exact path="/login" component={Login} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
