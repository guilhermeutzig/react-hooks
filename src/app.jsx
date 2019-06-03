import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import AsyncRoute from 'structure/async-route';
import ROUTES from 'constants/routes';

import 'styles/index';

const history = createHistory({
  basename: '',
  forceRefresh: false
});

const render = () => {
  ReactDOM.render(
    <Router history={history}>
      {ROUTES && (
        <Switch>
          {ROUTES.map((item, i) => {
            const { exact, component, path } = item;
            return (
              <Route
                key={i}
                path={path}
                exact={exact}
                render={props => {
                  return <AsyncRoute {...props} component={component} />;
                }}
              />
            );
          })}
        </Switch>
      )}
    </Router>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept(render(), () => {
    render();
  });
}
