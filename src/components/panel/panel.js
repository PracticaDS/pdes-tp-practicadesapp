import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateSelected from '../../actions/updateSelected'

import './panel.css'

class Panel extends Component {

  render() {
    const { machines, selected, updateSelected } = this.props;

    return (
      <div className="panel">
        { machines.map(({ className, src, alt }, i) => <img key={i} className={className} src={src} alt={alt} onClick={() => updateSelected(i)} />) }

        selected: { selected }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machines: state.panel.machines,
  selected: state.panel.selected
});

const mapDispatchToProps = {
  updateSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);