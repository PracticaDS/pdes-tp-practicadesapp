import { type as updateSelected } from '../actions/updateSelected';
import { type as updateMachineSelected } from '../actions/updateMachineSelected';
import { type as tick } from '../actions/tick';
import { type as gameMode } from '../actions/gameMode';
import machines from '../data/machines';
import machinesSelector from '../data/machinesSelector';
import { flatMap } from 'lodash'

const getPositions = (pos, type, material) => {
  if(type === 'seller') return [{ pos, material }];
  const positions = [];
  if(type === 'starter') {
    if(pos - 10 >= 0) positions.push(pos - 10);
    if(pos + 10 <= 99) positions.push(pos + 10);
    if(pos % 10 !== 0 && pos !== 0) positions.push(pos - 1);
    if(pos + 1 % 10 !== 0 && pos !== 99) positions.push(pos + 1);
  }
  if(type !== 'starter' && pos !== 99) positions.push(pos + 1);
  return positions.map(pos => ({ pos, material }));
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
      const machinesUpdated = Object.assign([], state.machines);
      machinesUpdated[state.selected] = Object.assign({}, machinesUpdated[state.selected], { className: 'piece' });
      machinesUpdated[selected] = Object.assign({}, machinesUpdated[selected], 
        state.machineSelected === -1
        ? { 
            className: 'selected',
            rawMaterials: state.machines[selected].typeMachine === 'starter' 
             ? [...state.machines[selected].rawMaterials, state.machines[selected].rawMaterialStarter]
             : state.machines[selected].rawMaterials
          }
        : { 
            className: 'selected', 
            src: state.machinesSelector[state.machineSelected].src, 
            typeMachine: state.machinesSelector[state.machineSelected].typeMachine,
            rawMaterialStarter: state.machinesSelector[state.machineSelected].rawMaterialStarter,
            rawMaterials: state.machinesSelector[state.machineSelected].rawMaterials
          });
      console.log(machinesUpdated[selected]);
      return Object.assign({}, state, { machines: machinesUpdated, selected });
    }
    case updateMachineSelected: {
      const machinesSelectorUpdated = Object.assign([], state.machinesSelector);
      machinesSelectorUpdated[state.machineSelected] = Object.assign({}, machinesSelectorUpdated[state.machineSelected], { className: 'machine' });
      machinesSelectorUpdated[selected] = Object.assign({}, machinesSelectorUpdated[selected], { className: 'selected' });
      return Object.assign({}, state, { machinesSelector: machinesSelectorUpdated, machineSelected: selected });
    }
    case tick: {
      const machinesUpdated = Object.assign([], state.machines);
      const nextPositions = flatMap(machinesUpdated, ({rawMaterials, typeMachine}, position) => rawMaterials.length ? getPositions(position, typeMachine, rawMaterials[0]) : []);
      const newMachinesUpdated = machinesUpdated.map(m => m.rawMaterials.length ? Object.assign({}, m, { rawMaterials: m.rawMaterials.slice(1) }) : m);
      nextPositions.forEach(({ pos, material }) => {
        const { typeMachine } = newMachinesUpdated[pos];
        // if (typeMachine === 'seller') sumar ganancias
        if(typeMachine === 'transporter') {
          newMachinesUpdated[pos].rawMaterials = [...newMachinesUpdated[pos].rawMaterials, material]
        };
      });
      return Object.assign({}, state, { machines: newMachinesUpdated });
    }
    case gameMode: {
      const machinesSelectorUpdated = Object.assign([], state.machinesSelector);
      machinesSelectorUpdated[state.machineSelected] = Object.assign({}, state.machinesSelector[state.machineSelected], { className: 'machine' });
      return Object.assign({}, state, { machinesSelector: machinesSelectorUpdated, machineSelected: -1 });
    }
    default:
      return state;
  }
}

export default panel;