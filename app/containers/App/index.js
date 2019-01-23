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
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
} from '../../utils/authWrapper';

export default function App() {
  const LoginComp = UserIsNotAuthenticated(Login);
  const Protected = UserIsAuthenticated(Cap);
  return (
    <div>
      <Switch>
        <Route exact path="/campaigns" component={Protected} />
        <Route exact path="/login" component={LoginComp} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
