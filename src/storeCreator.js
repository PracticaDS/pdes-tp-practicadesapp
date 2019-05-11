import { createStore, combineReducers } from 'redux';
import panel from './reducers/panel';

const reducer = combineReducers({
  panel
});

export default createStore(reducer);
