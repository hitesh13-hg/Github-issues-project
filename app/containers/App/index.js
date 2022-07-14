/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react'; // eslint-disable-line no-unused-vars
import { Switch, Route, Router } from 'react-router-dom';
import history from 'utils/history';
import GlobalStyle from '../../global-styles';
import Home from '../Home/Home';
import Issue from '../Issue/Issue';

const RenderRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);
export default function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <RenderRoute exact path="/" component={Home} />
          <RenderRoute exact path="/issue/:id" component={Issue} />
        </Switch>
      </Router>
      <GlobalStyle />
    </div>
  );
}
