import React, { Component } from 'react';
import { connect } from 'react-redux';
import tickPanel from '../../actions/tick';

import './earnings.css';

class Earnings extends Component {
  render() {
    const { earnings, tick } = this.props;

    return (
      <div>
        <div className="earnings">
          <h5>Ganancias</h5> <h5>$ {earnings}</h5>{' '}
        </div>

        <button type="button" className="buttonTick" onClick={() => tick()}>
          Tick
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  earnings: state.panel.earnings
});

const mapDispatchToProps = {
  tick: tickPanel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Earnings);
