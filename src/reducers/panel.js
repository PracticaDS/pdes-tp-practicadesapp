import { flatMap } from 'lodash';
import { type as updateSelected } from '../actions/updateSelected';
import { type as updateMachineSelected } from '../actions/updateMachineSelected';
import { type as tick } from '../actions/tick';
import machines from '../data/machines';
import machinesSelector from '../data/machinesSelector';
import empty from '../images/empty.png';

const getPosition = (pos, type, material, dir) => {
  if (type === 'seller') return [{ pos, material }];
  if (dir === 'u' && pos - 10 >= 0) return [{ pos: pos - 10, material }];
  if (dir === 'd' && pos + 10 <= 99) return [{ pos: pos + 10, material }];
  if (dir === 'l' && pos % 10 !== 0 && pos !== 0) return [{ pos: pos - 1, material }];
  if (dir === 'r' && pos + (1 % 10) !== 0 && pos !== 99) return [{ pos: pos + 1, material }];
  return [];
};

const getCrafterPosition = (rawMaterials, crafterMaterials, pos, material, dir) =>
  crafterMaterials.every(m => rawMaterials.includes(m)) ? getPosition(pos, 'crafter', material, dir) : [];

const crafterDeleteMaterials = (rawMaterials, crafterMaterials) => {
  const indexes = crafterMaterials.map(m => rawMaterials.indexOf(m));
  return rawMaterials.filter((_, i) => !indexes.includes(i));
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
    // girar mode
    case 5: {
      if (state.machines[state.selected].typeMachine === 'seller') return {};
      const direction = getNextPostGirar(state.machines[state.selected].direction);
      return {
        className: `${direction}selected`,
        direction
      };
    }
    // select mode
    case 6:
      return { className: `${state.machines[selected].className.slice(0, 1)}selected` };
    // delete
    case 7:
      return {
        src: empty,
        typeMachine: -1
      };
    // oro
    case 8: {
      return {
        className: `${state.machines[selected].className.slice(0, 1)}selected`,
        rawMaterials:
          state.machines[selected].typeMachine === 'starter'
            ? [...state.machines[selected].rawMaterials, state.machinesSelector[state.machineSelected].value]
            : []
      };
    }
    // hierro
    case 9: {
      return {
        className: `${state.machines[selected].className.slice(0, 1)}selected`,
        rawMaterials:
          state.machines[selected].typeMachine === 'starter'
            ? [...state.machines[selected].rawMaterials, state.machinesSelector[state.machineSelected].value]
            : []
      };
    }
    // cobre
    case 10: {
      return {
        className: `${state.machines[selected].className.slice(0, 1)}selected`,
        rawMaterials:
          state.machines[selected].typeMachine === 'starter'
            ? [...state.machines[selected].rawMaterials, state.machinesSelector[state.machineSelected].value]
            : []
      };
    }
    // receta: oro y cobre -> hierro
    case 11: {
      return {
        className: `${state.machines[selected].className.slice(0, 1)}selected`,
        crafterReturn: state.machinesSelector[state.machineSelected].crafterReturn,
        crafterMaterials:
          state.machines[selected].typeMachine === 'crafter'
            ? state.machinesSelector[state.machineSelected].crafterMaterials
            : []
      };
    }
    // receta: hierro deretido y cobre -> oro
    case 12: {
      return {
        className: `${state.machines[selected].className.slice(0, 1)}selected`,
        crafterReturn: state.machinesSelector[state.machineSelected].crafterReturn,
        crafterMaterials: state.machinesSelector[state.machineSelected].crafterMaterials
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

const updateRawMaterials = (nextPositions, machinesToUpdate) => {
  let earning = 0;
  const newMachines = machinesToUpdate.map((machine, pos) => {
    if (nextPositions.map(({ pos: p }) => p).includes(pos)) {
      switch (machine.typeMachine) {
        case 'crafter': {
          return Object.assign({}, machine, {
            rawMaterials: [
              ...machinesToUpdate[pos].rawMaterials,
              ...nextPositions.filter(({ pos: p }) => p === pos).map(({ material }) => material)
            ]
          });
        }
        case 'furnace': {
          return Object.assign({}, machine, {
            rawMaterials: [
              ...machinesToUpdate[pos].rawMaterials,
              ...nextPositions.filter(({ pos: p }) => p === pos).map(({ material }) => material - 10)
            ]
          });
        }
        case 'seller': {
          earning += nextPositions.reduce((acc, { pos: p, material }) => {
            const e = p === pos ? material : 0;
            return acc + e;
          }, 0);
          return machine;
        }
        case 'transporter': {
          return Object.assign({}, machine, {
            rawMaterials: [
              ...machinesToUpdate[pos].rawMaterials,
              ...nextPositions.filter(({ pos: p }) => p === pos).map(({ material }) => material)
            ]
          });
        }
        case 'starter': {
          return Object.assign({}, machine, {
            rawMaterials: [
              ...machinesToUpdate[pos].rawMaterials,
              ...nextPositions.filter(({ pos: p }) => p === pos).map(({ material }) => material)
            ]
          });
        }
        default:
          return machine;
      }
    }
    return machine;
  });
  return { newMachines, earning };
};

const initialState = {
  machines,
  selected: 24,
  machinesSelector,
  machineSelected: 6,
  earnings: 0,
  chooseRawMaterial: false,
  chooseCrafter: false
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
      const chooseRawMaterial = machinesUpdated[selected].typeMachine === 'starter';
      const chooseCrafter = machinesUpdated[selected].typeMachine === 'crafter';
      return Object.assign({}, state, {
        machines: machinesUpdated,
        selected,
        chooseRawMaterial,
        chooseCrafter
      });
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
      const nextPositions = flatMap(
        machinesUpdated,
        ({ rawMaterials, typeMachine, direction, crafterMaterials, crafterReturn }, position) =>
          rawMaterials.length
            ? typeMachine === 'crafter'
              ? getCrafterPosition(rawMaterials, crafterMaterials, position, crafterReturn, direction)
              : getPosition(position, typeMachine, rawMaterials[0], direction)
            : []
      );
      const newMachinesUpdated = machinesUpdated.map(m =>
        m.rawMaterials.length
          ? m.typeMachine === 'crafter'
            ? getCrafterPosition(m.rawMaterials, m.crafterMaterials, 1, m.crafterReturn, m.direction).length
              ? Object.assign({}, m, {
                  rawMaterials: crafterDeleteMaterials(m.rawMaterials, m.crafterMaterials)
                })
              : m
            : Object.assign({}, m, { rawMaterials: m.rawMaterials.splice(1) })
          : m
      );
      const { newMachines, earning } = updateRawMaterials(nextPositions, newMachinesUpdated);
      return Object.assign({}, state, {
        machines: newMachines,
        earnings: state.earnings + earning
      });
    }
    default:
      return state;
  }
}

export default panel;
