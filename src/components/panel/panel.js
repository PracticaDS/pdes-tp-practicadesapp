import React, { Component } from 'react';
import { connect } from 'react-redux';
import findMachines from '../../actions/findMachines';
import empty from '../../images/empty.png'

import './panel.css'

class Panel extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { findMachines } = this.props;
    findMachines();
  }

  render() {
      const {
        machines,
        selected
      } = this.props;

      return (
        <div className="panel">
          { Array.from({ length: 100 }).map(() => <img className="piece" src={empty} />) }
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