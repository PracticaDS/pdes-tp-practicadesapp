import React, { Component } from 'react';
import { connect } from 'react-redux';

import './earnings.css';

class Earnings extends Component {
  render() {
    const { earnings } = this.props;

    return <div className="earnings"><h5>Ganancias</h5> <h5>$ {earnings}</h5> </div>;
  }
}

const mapStateToProps = state => ({
  earnings: state.panel.earnings
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Earnings);
