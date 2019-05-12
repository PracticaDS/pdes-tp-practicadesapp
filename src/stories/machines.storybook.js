import { Provider } from 'react-redux';
import React from 'react';
import { storiesOf } from '@storybook/react';
import storeCreator from '../storeCreator';
import Machines from '../components/machines/machines';

storiesOf('Machines', module).add('Machines', () => (
  <Provider store={storeCreator}>
    <Machines />
  </Provider>
));
