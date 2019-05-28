import React, { Component } from 'react';
import { connect } from 'react-redux';
import tickPanel from '../../actions/tick';
import MachineService from '../../services/machine';

import './earnings.css';

class Earnings extends Component {
  constructor(props) {
    super(props);
    this.machineService = new MachineService();
  }

  save() {
    console.log(this.props.machines);
    this.machineService
      .putMachines(this.props.machines)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { earnings, tick } = this.props;

    return (
      <div>
        <div className="earnings">
          <h5>Ganancias</h5> <h5>$ {earnings}</h5>{' '}
        </div>

        <button type="button" className="buttonTick" onClick={() => this.save()}>
          Guardar
        </button>

        <br />

        <button type="button" className="buttonTick" onClick={() => tick()}>
          Tick
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  earnings: state.panel.earnings,
  machines: state.panel.machines
});

const mapDispatchToProps = {
  tick: tickPanel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Earnings);
