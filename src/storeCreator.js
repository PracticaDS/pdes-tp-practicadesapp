import { createStore, combineReducers } from 'redux'
import machines from './reducers/machines'

const reducer = combineReducers({
  machines
});

export default createStore(reducer);