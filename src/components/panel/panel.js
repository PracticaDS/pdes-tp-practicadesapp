import React, { Component } from 'react';
import { connect } from 'react-redux';
import findMachines from '../../actions/findMachines';

import './panel.css'

class Panel extends Component {

  componentDidMount() {
    const { findMachines } = this.props;
    findMachines();
  }

  render() {
    const { machines } = this.props;

    return (
      <div className="panel">
        { machines.map(({ className, src, alt }, i) => <img key={i} className={className} src={src} alt={alt} />) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machines: state.machines,
  selected: state.selected
});

const mapDispatchToProps = {
  findMachines
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);