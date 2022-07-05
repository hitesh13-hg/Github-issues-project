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

// import Cap from '../Cap';
// import Login from '../Login';
import NotFoundPage from '../NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
// import { publicPath } from '../../config/path';
// import config from '../../config/app';

// import { userIsAuthenticatedRedir } from '../../utils/authWrapper';
import Home from '../Home/Home';
import Issue from '../Issue/Issue';

// const loginUrl =
//   process.env.NODE_ENV === 'production'
//     ? `${config.production.login_url}`
//     : `${config.development.login_url}`;

// const Protected = userIsAuthenticatedRedir(Cap);
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
          <RenderRoute component={NotFoundPage} />
        </Switch>
      </Router>
      <GlobalStyle />
    </div>
  );
}
