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
      <div className="App">
        <Machines />
        <Earnings />
        <Panel />
        <Details />
      </div>
    );
  }
}

export default App;
