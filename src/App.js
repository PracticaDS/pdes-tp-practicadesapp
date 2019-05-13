/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Machines from './components/machines/machines';
import Panel from './components/panel/panel';
import Details from './components/details/details';
import Earnings from './components/earnings/earnings';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="grid-container">
        <div className="header-container">
          <h1>Revolución Industrial</h1>
        </div>
        <div class="body-container">
          <div class="row">
            <div class="col-md-4">
              <Machines />
            </div>
            <div class="col-md-4">
              <Earnings />
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <Panel />
            </div>
            <div class="col-md-4">
              <Details />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
