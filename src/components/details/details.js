import React, { Component } from 'react';
import { connect } from 'react-redux';

import './details.css';

class Details extends Component {
  render() {
    const {
      machine: { rawMaterials, typeMachine, rawMaterialStarter, direction, className }
    } = this.props;

    return (
      <div className="details">
        rawMaterials: [{rawMaterials.map(m => `${m}, `)}], typeMachine: {typeMachine}, rawMaterialStarter:
        {rawMaterialStarter}, direction: {direction}, className: {className}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machine: state.panel.machines[state.panel.selected]
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
