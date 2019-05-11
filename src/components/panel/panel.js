/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateSelected from '../../actions/updateSelected';
import tick from '../../actions/tick';

import './panel.css';

class Panel extends Component {
  render() {
    const { machines, selected, updateSelected, tick } = this.props;

    return (
      <div className="panel">
        {machines.map(({ className, src, alt }, i) => (
          <img key={i} className={className} src={src} alt={alt} onClick={() => updateSelected(i)} />
        ))}
        selected: {selected}
        <button type="button" onClick={() => tick()}>
          Tick
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machines: state.panel.machines,
  selected: state.panel.selected
});

const mapDispatchToProps = {
  updateSelected,
  tick
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel);
