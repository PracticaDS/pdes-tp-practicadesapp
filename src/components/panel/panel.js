/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import update from '../../actions/updateSelected';
import updateMachinesAction from '../../actions/updateMachines';
import MachineService from '../../services/machine';
import empty from '../../images/empty.png';

import './panel.css';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.machineService = new MachineService();
    this.state = { factories: [], name: '' };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.save(), 5000);
    this.machineService
      .getMachines(this.getFactoryId())
      .then(({ data: machines }) => {
        console.log(this.getFactoryId());
        this.props.updateMachines(machines);
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  save() {
    const cantMachines = this.props.machines.reduce((cant, m) => (m.src === empty ? cant : cant + 1), 0);
    const factoryId = get(this.props, ['machines', 0, 'factoryId'], '');
    console.log(factoryId);
    this.machineService
      .putMachines({ machines: this.props.machines, factoryId, cantMachines })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  getFactoryId() {
    return JSON.parse(localStorage.getItem('factoryId'));
  }

  render() {
    const { machines, updateSelected } = this.props;

    return (
      <div className="panel">
        {machines.map(({ className, src, alt }, i) => (
          <img key={i} className={className} src={src} alt={alt} onClick={() => updateSelected(i)} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machines: state.panel.machines
});

const mapDispatchToProps = {
  updateSelected: update,
  updateMachines: updateMachinesAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel);
