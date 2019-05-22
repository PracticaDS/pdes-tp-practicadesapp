/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Item, List, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MachineService from '../../services/machine';

class Factories extends Component {
  constructor(props) {
    super(props);
    this.machineService = new MachineService();
    this.state = { factories: [] };
  }

  componentDidMount() {
    this.machineService
      .getFactories(JSON.parse(localStorage.getItem('user')))
      .then(factories => {
        this.setState({ factories });
      })
      .catch(err => console.log(err));
  }

  render() {
    const st = {
      textAlign: 'center',
      backgroundColor: '#f7f7f7',
      width: '158px',
      margin: '10px',
      height: 'available'
    };
    return (
      <div>
        <Item.Group divided>
          {this.state.factories.map((factory, i) => (
            <List.Item>
              <Card style={st}>
                <Card.Content>
                  <Card.Header>{factory.name}</Card.Header>
                  <Card.Meta>{factory.name}</Card.Meta>
                </Card.Content>
              </Card>
            </List.Item>
          ))}
        </Item.Group>
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
