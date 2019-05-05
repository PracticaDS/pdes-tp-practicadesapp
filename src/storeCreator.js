import { createStore, combineReducers } from 'redux'
import findMachines from './reducers/machines'

const reducer = combineReducers({
  findMachines
});

export default createStore(reducer);