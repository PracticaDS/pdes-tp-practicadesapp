import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateeSelected from '../../actions/updateMachineSelected';
import select from '../../actions/selectMode';

import './machines.css';

class MachinesSelector extends Component {
  render() {
    const { machinesSelector, updateMachineSelected, chooseRawMaterial, chooseCrafter } = this.props;

    return (
      <div className="machines">
        <h5>Máquinas</h5>
        {machinesSelector.slice(0, 5).map(({ className, src, alt }, i) => (
          <img key={i} className={className} src={src} alt={alt} onClick={() => updateMachineSelected(i)} />
        ))}

        <h5>Acciones</h5>
        {machinesSelector.slice(5, 8).map(({ className, src, alt }, i) => (
          <img
            key={i}
            className={className}
            src={src}
            alt={alt}
            onClick={() => updateMachineSelected(i + 5)}
          />
        ))}

        {chooseRawMaterial && <h5>Materiales</h5>}

        {chooseRawMaterial &&
          machinesSelector
            .slice(8, 11)
            .map(({ className, src, alt }, i) => (
              <img
                key={i}
                className={className}
                src={src}
                alt={alt}
                onClick={() => updateMachineSelected(i + 8)}
              />
            ))}

        {chooseCrafter && <h5>Recetas</h5>}

        {chooseCrafter &&
          machinesSelector
            .slice(11, 13)
            .map(({ className, src, alt }, i) => (
              <img
                key={i}
                className={className}
                src={src}
                alt={alt}
                onClick={() => updateMachineSelected(i + 11)}
              />
            ))}
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
