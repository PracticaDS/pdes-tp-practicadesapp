/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import LogIn from './components/login';
import * as serviceWorker from './serviceWorker';
import storeCreator from './storeCreator';

ReactDOM.render(
  <Provider store={storeCreator}>
    <Router>
      <Route path="/panel" component={App} />
      <Route path="/" component={LogIn} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
