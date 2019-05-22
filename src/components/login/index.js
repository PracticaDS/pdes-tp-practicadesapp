/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import './panel.css';

class LogIn extends Component {
  render() {
    return (
      <div>
        <h2>Bienvenido a Revolucion Industrial!</h2>
        <br />
        <div className="ui action input">
          <input type="text" size="40" placeholder="Usuario..." />
          <button className="ui button" onClick={() => (window.location.pathname = '/panel')}>
            Ingresar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
