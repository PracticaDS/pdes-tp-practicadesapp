import React, { Component } from 'react'
import Machines from './components/machines/machines'
import Panel from './components/panel/panel'
import Details from './components/details/details'

import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Machines/>
        <Panel/>
        <Details/>
      </div>
    );
  }
}

export default App;
