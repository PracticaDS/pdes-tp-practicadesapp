import { type as updateSelected } from '../actions/updateSelected';
import machines from '../data/machines';

const initialState = { machines, selected: 24 };

function panel(state = initialState, { type, selected }) {
  switch (type) {
    case updateSelected: {
      const machinesUpdated = state.machines;
      machinesUpdated[state.selected] = Object.assign({}, machinesUpdated[state.selected], { className: 'piece' });
      machinesUpdated[selected] = Object.assign({}, machinesUpdated[selected], { className: 'selected' });
      return { machines: machinesUpdated, selected };
    }
    default:
      return state;
  }
}

export default panel;