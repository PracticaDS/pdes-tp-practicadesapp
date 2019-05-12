/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import storeCreator from './storeCreator';

ReactDOM.render(
  <Provider store={storeCreator}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();