import React, { Component } from 'react';
import { connect } from 'react-redux';

import './details.css';

class Details extends Component {
  render() {
    const {
      machine: {
        rawMaterials,
        typeMachine,
        rawMaterialStarter,
        direction,
        className,
        crafterMaterials,
        crafterReturn
      }
    } = this.props;

    return (
      <div className="details">
        <h4 className="marginH4"> rawMaterials: [{rawMaterials.map(m => `${m}, `)}] </h4>
        <h4 className="marginH4"> typeMachine: {typeMachine} </h4>
        <h4 className="marginH4"> rawMaterialStarter: {rawMaterialStarter} </h4>
        <h4 className="marginH4"> direction: {direction} </h4>
        <h4 className="marginH4"> className: {className} </h4>
        <h4 className="marginH4"> crafterMaterials: [{crafterMaterials.map(m => `${m}, `)}] </h4>
        <h4 className="marginH4"> crafterReturn: {crafterReturn} </h4>
        <h4 className="marginH4"> receta1: oro y cobre -> hierro </h4>
        <h4 className="marginH4"> receta2: hierro deretido y cobre -> oro </h4>
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
