import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from '../../actions/updateSelected';

import './panel.css';

class Panel extends Component {
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
  updateSelected: update
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panel);
