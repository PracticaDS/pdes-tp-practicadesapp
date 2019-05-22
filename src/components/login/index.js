/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
  }

  enter() {
    localStorage.setItem('user', JSON.stringify(this.state.user));
    window.location.pathname = '/factories';
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h2>Bienvenido a Revolucion Industrial!</h2>
        <br />
        <div className="ui action input">
          <input
            type="text"
            name="user"
            size="40"
            placeholder="Usuario..."
            onChange={this.handleChange.bind(this)}
            defaultValue={this.state.user}
          />
          <button className="ui button" onClick={() => this.enter()}>
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
