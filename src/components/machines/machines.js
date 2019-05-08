import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateMachineSelected from '../../actions/updateMachineSelected'

import './machines.css'

class MachinesSelector extends Component {

  render() {
    const { machinesSelector, machineSelected, updateMachineSelected } = this.props;

    return (
      <div className="machines">

        { machinesSelector.map(({ className, src, alt }, i) => <img key={i} 
        className={className} src={src} alt={alt} 
        onClick={() => updateMachineSelected(i)} />) }

        { machineSelected }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  machinesSelector: state.panel.machinesSelector,
  machineSelected: state.panel.machineSelected
});

const mapDispatchToProps = {
  updateMachineSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(MachinesSelector);