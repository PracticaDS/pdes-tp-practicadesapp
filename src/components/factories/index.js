/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
import 'react-notifications/lib/notifications.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import MachineService from '../../services/machine';
import empty from '../../images/empty.png';
import './factories.css';

class Factories extends Component {
  constructor(props) {
    super(props);
    this.machineService = new MachineService();
    this.state = { factories: [], name: '' };
  }

  componentDidMount() {
    this.machineService
      .getFactories(this.getUserName())
      .then(({ data: factories }) => {
        this.setState({ factories });
      })
      .catch(err => console.log(err));
  }

  getUserName() {
    return JSON.parse(localStorage.getItem('user'));
  }

  crear() {
    if (this.state.name === '' || this.state.factories.map(f => f.name).includes(this.state.name)) {
      NotificationManager.error(this.state.name === '' ? 'name cannot be empty' : 'the name already exists', 'Error')
    } else {
      this.machineService
        .postFactory(this.getUserName(), { name: this.state.name, src: empty })
        .then(({ data }) => {
          localStorage.setItem('factoryId', JSON.stringify(data.factory._id));
          localStorage.setItem('name', JSON.stringify(data.factory.name));
          this.machineService.getFactories(this.getUserName()).then(({ data: factories }) => {
            this.setState({ factories });
            window.location.pathname = '/panel';
          });
        })
        .catch(err => console.log(err));
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  delete(factoryId) {
    this.machineService
      .deleteFactory(factoryId)
      .then(() => {
        this.machineService.getFactories(this.getUserName()).then(({ data: factories }) => {
          this.setState({ factories });
          NotificationManager.info('factory deleted', 'successfully');
        });
      })
      .catch(err => console.log(err));
  }

  signOut() {
    window.location.pathname = '/';
  }

  play(factoryId, name) {
    localStorage.setItem('factoryId', JSON.stringify(factoryId));
    localStorage.setItem('name', JSON.stringify(name));
    window.location.pathname = '/panel';
  }

  render() {
    return (
      <div>
        <NotificationContainer/>
        <button type="button" className="boton2" onClick={() => this.signOut()}>
          cerrar sesion
        </button>
        <br />
        <h2 className="">Hola {this.getUserName()}! Estas son tus fabricas:</h2>
        <br />
        <input
          type="text"
          name="name"
          size="40"
          placeholder="name..."
          onChange={this.handleChange.bind(this)}
          defaultValue={this.state.name}
        />
        <button type="button" className="boton2" onClick={() => this.crear()}>
          crear
        </button>
        <br />
        <br />
        <table className="ui single line table">
          <thead className="">
            <tr className="">
              <th className="">NOMBRE</th>
              <th className="">FECHA GUARDADA</th>
              <th className="">CANTIDAD DE MAQUINAS</th>
              <th className="">JUGAR</th>
              <th className="">ELIMINAR</th>
            </tr>
          </thead>
          <tbody className="">
            {this.state.factories.map((factory, i) => (
              <tr className="" key={i}>
                <td className="">{factory.name}</td>
                <td className="">{moment(factory.updatedAt).format('YYYY/MM/DD')}</td>
                <td className="">{factory.cantMachines}</td>
                <td className="">
                  <button
                    type="button"
                    className="boton"
                    onClick={() => this.play(factory._id, factory.name)}
                  >
                    jugar
                  </button>
                </td>
                <td className="">
                  <button type="button" className="boton" onClick={() => this.delete(factory._id)}>
                    eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Factories);
