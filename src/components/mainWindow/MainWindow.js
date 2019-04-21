import React from 'react';

import "./MainWindow.css"

export class MainWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }

  addAmount(amount) {
    this.setState({ state: amount })
  }

  render() {
    return <div className="mainWindow">Earnings: ${this.state.amount}</div>;
  }
}