/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateMachineSelected from '../../actions/updateMachineSelected';
import gameMode from '../../actions/gameMode';
import selectMode from '../../actions/selectMode';

import './machines.css';

class MachinesSelector extends Component {
  render() {
    const { machinesSelector, machineSelected, updateMachineSelected, gameMode, selectMode } = this.props;

    return (
      <div className="machines">
        {machinesSelector.map(({ className, src, alt }, i) => (
          <img key={i} className={className} src={src} alt={alt} onClick={() => updateMachineSelected(i)} />
        ))}

        {machineSelected}
        <button type="button" onClick={() => gameMode()}>
          gameMode
        </button>
        <button type="button" onClick={() => selectMode()}>
          selectMode
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machinesSelector: state.panel.machinesSelector,
  machineSelected: state.panel.machineSelected
});

const mapDispatchToProps = {
  updateMachineSelected,
  gameMode,
  selectMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MachinesSelector);
