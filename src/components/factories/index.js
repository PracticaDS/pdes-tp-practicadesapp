/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import MachineService from '../../services/machine';
import './factories.css';

class Factories extends Component {
  constructor(props) {
    super(props);
    this.machineService = new MachineService();
    this.state = { factories: [] };
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

  render() {
    return (
      <div>
        <br />
        <h2 className="">Hola {this.getUserName()}! Estas son tus fabricas:</h2>
        <br />
        <button type="button" className="boton2">
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
            {this.state.factories.map(factory => (
              <tr className="">
                <td className="">{factory.name}</td>
                <td className="">{moment(factory.updatedAt).format('YYYY/MM/DD')}</td>
                <td className="">{factory.cantMachines}</td>
                <td className="">
                  <button type="button" className="boton">
                    jugar
                  </button>
                </td>
                <td className="">
                  <button type="button" className="boton">
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
