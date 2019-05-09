import { type as updateSelected } from '../actions/updateSelected';
import { type as updateMachineSelected } from '../actions/updateMachineSelected';
import machines from '../data/machines';
import machinesSelector from '../data/machinesSelector';

const getPositions = pos => {
  const positions = [];
  if(pos - 10 >= 0) positions.push(pos - 10);
  if(pos + 10 <= 99) positions.push(pos + 10);
  if(pos % 10 !== 0 && pos !== 0) positions.push(pos - 1);
  if(pos + 1 % 10 !== 0 && pos !== 99) positions.push(pos + 1);
  return positions;
}

const initialState = { 
  machines, 
  selected: 24, 
  machinesSelector, 
  machineSelected: -1,
  rawMaterialPositions: []
};

function panel(state = initialState, { type, selected }) {
  switch (type) {
    case updateSelected: {
      const machinesUpdated = state.machines;
      machinesUpdated[state.selected] = Object.assign({}, machinesUpdated[state.selected], { className: 'piece' });
      machinesUpdated[selected] = Object.assign({}, machinesUpdated[selected], 
        state.machineSelected === -1
        ? { className: 'selected' }
        : { className: 'selected', src: state.machinesSelector[state.machineSelected].src });
      const { type, exitPosition } = state.machines[selected];
      if(type === 'starter') {
        const nextPositions = getPositions(selected);
        // nextPositions.forEach(pos => state.machines[pos])
      }
      return Object.assign({}, state, { machines: machinesUpdated, selected });
    }
    case updateMachineSelected: {
      const machinesSelectorUpdated = state.machinesSelector;
      machinesSelectorUpdated[state.machineSelected] = Object.assign({}, machinesSelectorUpdated[state.machineSelected], { className: 'machine' });
      machinesSelectorUpdated[selected] = Object.assign({}, machinesSelectorUpdated[selected], { className: 'selected' });
      return Object.assign({}, state, { machinesSelector: machinesSelectorUpdated, machineSelected: selected });
    }
    default:
      return state;
  }
}

export default panel;