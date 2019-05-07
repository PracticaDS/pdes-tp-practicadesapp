import { type as updateSelected } from '../actions/updateSelected';
import machines from '../data/machines';

const initialState = { machines, selected: 10 };

function panel(state = initialState, { type, selected }) {
  switch (type) {
    case updateSelected: {
      console.log(selected)
      return Object.assign(state, { selected });
    }
    default:
      return state;
  }
}

export default panel;