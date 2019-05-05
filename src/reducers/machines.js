import { type as findMachines } from '../actions//findMachines';
import machines from '../data/machines';

const defaultState = [];

function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case findMachines: {
      return machines;
    }
    default:
      return state;
  }
}

export default reducer;