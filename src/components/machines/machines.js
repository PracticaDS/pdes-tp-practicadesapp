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
      chooseRawMaterial,
      chooseCrafter
    } = this.props;

    return (
      <div className="machines">
        <h5>Máquinas</h5>
        {machinesSelector.slice(0, 5).map(({ className, src, alt }, i) => (
          <img key={i} className={className} src={src} alt={alt} onClick={() => updateMachineSelected(i)} />
        ))}

        {chooseRawMaterial &&
          <h5>Materiales:</h5>
        }

        {chooseRawMaterial &&
          machinesSelector
            .slice(5, 8)
            .map(({ className, src, alt }, i) => (
              <img
                key={i}
                className={className}
                src={src}
                alt={alt}
                onClick={() => updateMachineSelected(i + 8)}
              />
            ))}

        {chooseCrafter &&
          <h5>Recetas:</h5>
        }

        {chooseCrafter &&
          machinesSelector
            .slice(8, 10)
            .map(({ className, src, alt }, i) => (
              <img
                key={i}
                className={className}
                src={src}
                alt={alt}
                onClick={() => updateMachineSelected(i + 11)}
              />
            ))}

        {machineSelected}

        <h5>Acciones</h5>
        {machinesSelector.slice(10, 13).map(({ className, src, alt }, i) => (
          <img key={i} className={className} src={src} alt={alt} onClick={() => updateMachineSelected(i)} />
        ))}        

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
  chooseRawMaterial: state.panel.chooseRawMaterial,
  chooseCrafter: state.panel.chooseCrafter
});

const mapDispatchToProps = {
  updateMachineSelected: updateeSelected,
  selectMode: select
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MachinesSelector);
