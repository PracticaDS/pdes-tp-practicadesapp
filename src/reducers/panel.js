import { flatMap } from 'lodash';
import { type as updateSelected } from '../actions/updateSelected';
import { type as updateMachineSelected } from '../actions/updateMachineSelected';
import { type as tick } from '../actions/tick';
import { type as gameMode } from '../actions/gameMode';
import machines from '../data/machines';
import machinesSelector from '../data/machinesSelector';

const getPosition = (pos, type, material, dir) => {
  if (type === 'seller') return [{ pos, material }];
  if (dir === 'up' && pos - 10 >= 0) return [{ pos: pos - 10, material }];
  if (dir === 'down' && pos + 10 <= 99) return [{ pos: pos + 10, material }];
  if (dir === 'left' && pos % 10 !== 0 && pos !== 0) return [{ pos: pos - 1, material }];
  if (dir === 'right' && pos + (1 % 10) !== 0 && pos !== 99) return [{ pos: pos + 1, material }];
  return [];
};

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
      machinesUpdated[state.selected] = Object.assign({}, machinesUpdated[state.selected], {
        className: 'piece'
      });
      machinesUpdated[selected] = Object.assign(
        {},
        machinesUpdated[selected],
        state.machineSelected === -1
          ? {
              className: 'selected',
              rawMaterials:
                state.machines[selected].typeMachine === 'starter'
                  ? [...state.machines[selected].rawMaterials, state.machines[selected].rawMaterialStarter]
                  : state.machines[selected].rawMaterials
            }
          : {
              className: 'selected',
              src: state.machinesSelector[state.machineSelected].src,
              typeMachine: state.machinesSelector[state.machineSelected].typeMachine,
              rawMaterialStarter: state.machinesSelector[state.machineSelected].rawMaterialStarter,
              rawMaterials: state.machinesSelector[state.machineSelected].rawMaterials,
              direction: state.machinesSelector[state.machineSelected].direction
            }
      );
      return Object.assign({}, state, { machines: machinesUpdated, selected });
    }
    case updateMachineSelected: {
      const machinesSelectorUpdated = Object.assign([], state.machinesSelector);
      machinesSelectorUpdated[state.machineSelected] = Object.assign(
        {},
        machinesSelectorUpdated[state.machineSelected],
        { className: 'machine' }
      );
      machinesSelectorUpdated[selected] = Object.assign({}, machinesSelectorUpdated[selected], {
        className: 'selected'
      });
      return Object.assign({}, state, {
        machinesSelector: machinesSelectorUpdated,
        machineSelected: selected
      });
    }
    case tick: {
      const machinesUpdated = Object.assign([], state.machines);
      const nextPositions = flatMap(machinesUpdated, ({ rawMaterials, typeMachine, direction }, position) =>
        rawMaterials.length ? getPosition(position, typeMachine, rawMaterials[0], direction) : []
      );
      const newMachinesUpdated = machinesUpdated.map(m =>
        m.rawMaterials.length ? Object.assign({}, m, { rawMaterials: m.rawMaterials.slice(1) }) : m
      );
      const newMachines = newMachinesUpdated.map((machine, pos) => {
        if (nextPositions.map(({ pos: p }) => p).includes(pos)) {
          // if (typeMachine === 'seller') sumar ganancias
          if (machine.typeMachine === 'transporter') {
            return Object.assign({}, machine, {
              rawMaterials: [
                ...newMachinesUpdated[pos].rawMaterials,
                ...nextPositions.filter(({ pos: p }) => p === pos).map(({ material }) => material)
              ]
            });
          }
        }
        return machine;
      });
      return Object.assign({}, state, { machines: newMachines });
    }
    case gameMode: {
      const machinesSelectorUpdated = Object.assign([], state.machinesSelector);
      machinesSelectorUpdated[state.machineSelected] = Object.assign(
        {},
        state.machinesSelector[state.machineSelected],
        { className: 'machine' }
      );
      return Object.assign({}, state, { machinesSelector: machinesSelectorUpdated, machineSelected: -1 });
    }
    default:
      return state;
  }
}

export default panel;
