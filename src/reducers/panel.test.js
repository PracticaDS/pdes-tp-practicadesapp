import expect from 'expect';
import configureStore from 'redux-mock-store';
import reducer from './panel';
import machines from '../data/machines';
import machinesSelector from '../data/machinesSelector';
import updateSelected from '../actions/updateSelected';
import updateMachineSelected from '../actions/updateMachineSelected';
import tick from '../actions/tick';
import selectMode from '../actions/selectMode';
import girar from '../actions/girar';

const initialState = {
  machines,
  selected: 24,
  machinesSelector,
  machineSelected: 6,
  earnings: 0,
  chooseRawMaterial: false,
  chooseCrafter: false
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('reducer', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should run updateMachineSelected', () => {
    const expectedActions = [
      {
        type: 'updateMachineSelected',
        selected: 2
      }
    ];
    store.dispatch(updateMachineSelected(2));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should run tick', () => {
    const expectedActions = [
      {
        type: 'tick'
      }
    ];
    store.dispatch(tick(2));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should run selectMode', () => {
    const expectedActions = [
      {
        type: 'selectMode'
      }
    ];
    store.dispatch(selectMode(2));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should run updateSelected', () => {
    const expectedActions = [
      {
        type: 'updateSelected',
        selected: 2
      }
    ];
    store.dispatch(updateSelected(2));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should run girar', () => {
    const expectedActions = [
      {
        type: 'girar'
      }
    ];
    store.dispatch(girar(2));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('al ckickear en una maquina del selector se actualiza la maquina seleccionada', () => {
    expect(initialState.machineSelected).toEqual(6);
    const finalState = reducer(initialState, {
      type: 'updateMachineSelected',
      selected: 2
    });
    expect(finalState.machineSelected).toEqual(2);
  });
  it('al ckickear en una maquina del selector se actualiza el className', () => {
    expect(initialState.machinesSelector[2].className).toEqual('machine');
    const finalState = reducer(initialState, {
      type: 'updateMachineSelected',
      selected: 2
    });
    const className = finalState.machinesSelector[2].className;
    expect(className).toEqual('selected');
  });
  it('al ckickear en el panel se actualiza el casillero seleccionado', () => {
    expect(initialState.selected).toEqual(24);
    const finalState = reducer(initialState, {
      type: 'updateSelected',
      selected: 10
    });
    expect(finalState.selected).toEqual(10);
  });
});
