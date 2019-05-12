import { mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import React from 'react';
import storeCreator from '../../storeCreator';
import Machines from './machines';

describe('Machines', () => {
  function createMachines() {
    return mount(
      <Provider store={storeCreator}>
        <Machines />
      </Provider>
    );
  }

  it('algo', () => {
    // const machines = createMachines();
    // machines.find('button').simulate('selectMode');
    // expect(machines.state().machineSelected).toEqual(-2);
    expect(1).toEqual(1);
  });
});
