import { flatMap } from 'lodash';
import { type as updateSelected } from '../actions/updateSelected';
import { type as updateMachineSelected } from '../actions/updateMachineSelected';
import { type as tick } from '../actions/tick';
import { type as gameMode } from '../actions/gameMode';
import { type as selectMode } from '../actions/selectMode';
import machines from '../data/machines';
import machinesSelector from '../data/machinesSelector';

const getPosition = (pos, type, material, dir) => {
  if (type === 'seller') return [{ pos, material }];
  if (dir === 'u' && pos - 10 >= 0) return [{ pos: pos - 10, material }];
  if (dir === 'd' && pos + 10 <= 99) return [{ pos: pos + 10, material }];
  if (dir === 'l' && pos % 10 !== 0 && pos !== 0) return [{ pos: pos - 1, material }];
  if (dir === 'r' && pos + (1 % 10) !== 0 && pos !== 99) return [{ pos: pos + 1, material }];
  return [];
};

const getNextPostGirar = pos => {
  switch (pos) {
    case 'd': {
      return 'l';
    }
    case 'l': {
      return 'u';
    }
    case 'u': {
      return 'r';
    }
    default:
      return 'd';
  }
};

const getMachineState = (state, selected) => {
  switch (state.machineSelected) {
    // game mode
    case -1: {
      return {
        className: `${state.machines[selected].className.slice(0, 1)}selected`,
        rawMaterials:
          state.machines[selected].typeMachine === 'starter'
            ? [...state.machines[selected].rawMaterials, state.machines[selected].rawMaterialStarter]
            : state.machines[selected].rawMaterials
      };
    }
    // select mode
    case -2: {
      return { className: `${state.machines[selected].className.slice(0, 1)}selected` };
    }
    // girar mode
    case 5: {
      if (state.machines[state.selected].typeMachine === 'seller') return {};
      const direction = getNextPostGirar(state.machines[state.selected].direction);
      return {
        className: `${direction}selected`,
        direction
      };
    }
    // machine in panel mode
    default:
      return {
        className: 'dselected',
        src: state.machinesSelector[state.machineSelected].src,
        typeMachine: state.machinesSelector[state.machineSelected].typeMachine,
        rawMaterialStarter: state.machinesSelector[state.machineSelected].rawMaterialStarter,
        rawMaterials: state.machinesSelector[state.machineSelected].rawMaterials,
        direction: state.machinesSelector[state.machineSelected].direction
      };
  }
};

const initialState = {
  machines,
  selected: 24,
  machinesSelector,
  machineSelected: -1
};

function panel(state = initialState, { type, selected }) {
  switch (type) {
    // click in panel
    case updateSelected: {
      const machinesUpdated = Object.assign([], state.machines);
      machinesUpdated[state.selected] = Object.assign({}, machinesUpdated[state.selected], {
        className: `${machinesUpdated[state.selected].className.slice(0, 1)}piece`
      });
      machinesUpdated[selected] = Object.assign(
        {},
        machinesUpdated[selected],
        getMachineState(state, selected)
      );
      return Object.assign({}, state, { machines: machinesUpdated, selected });
    }
    // click in select machine
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
    // tick
    case tick: {
      const machinesUpdated = Object.assign([], state.machines);
      const nextPositions = flatMap(machinesUpdated, ({ rawMaterials, typeMachine, direction }, position) =>
        rawMaterials.length ? getPosition(position, typeMachine, rawMaterials[0], direction) : []
      );
      const newMachinesUpdated = machinesUpdated.map(m =>
        m.rawMaterials.length ? Object.assign({}, m, { rawMaterials: m.rawMaterials }) : m
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
    // game mode
    case gameMode: {
      const machinesSelectorUpdated = Object.assign([], state.machinesSelector);
      machinesSelectorUpdated[state.machineSelected] = Object.assign(
        {},
        state.machinesSelector[state.machineSelected],
        { className: 'machine' }
      );
      return Object.assign({}, state, { machinesSelector: machinesSelectorUpdated, machineSelected: -1 });
    }
    // select mode
    case selectMode: {
      const machinesSelectorUpdated = Object.assign([], state.machinesSelector);
      machinesSelectorUpdated[state.machineSelected] = Object.assign(
        {},
        state.machinesSelector[state.machineSelected],
        { className: 'machine' }
      );
      return Object.assign({}, state, { machinesSelector: machinesSelectorUpdated, machineSelected: -2 });
    }
    default:
      return state;
  }
}

export default panel;
