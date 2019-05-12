import React, { Component } from 'react';
import { connect } from 'react-redux';

import './earnings.css';

class Earnings extends Component {
  render() {
    const { earnings } = this.props;

    return <div className="earnings">earnings: {earnings}</div>;
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
