import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateeSelected from '../../actions/updateMachineSelected';
import select from '../../actions/selectMode';

import './machines.css';

class MachinesSelector extends Component {
  render() {
    const {
      machinesSelector,
      machineSelected,
      updateMachineSelected,
      selectMode,
      chooseRawMaterial
    } = this.props;

    return (
      <div className="machines">
        {machinesSelector.slice(0, 8).map(({ className, src, alt }, i) => (
          <img key={i} className={className} src={src} alt={alt} onClick={() => updateMachineSelected(i)} />
        ))}

        {chooseRawMaterial &&
          machinesSelector
            .slice(8)
            .map(({ className, src, alt }, i) => (
              <img
                key={i}
                className={className}
                src={src}
                alt={alt}
                onClick={() => updateMachineSelected(i + 8)}
              />
            ))}

        {machineSelected}
        <button type="button" onClick={() => selectMode()}>
          selectMode
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machinesSelector: state.panel.machinesSelector,
  machineSelected: state.panel.machineSelected,
  chooseRawMaterial: state.panel.chooseRawMaterial
});

const mapDispatchToProps = {
  updateMachineSelected: updateeSelected,
  selectMode: select
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MachinesSelector);
