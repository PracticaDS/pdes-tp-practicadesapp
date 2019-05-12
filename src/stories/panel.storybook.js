import { Provider } from 'react-redux';
import React from 'react';
import { storiesOf } from '@storybook/react';
import storeCreator from '../storeCreator';
import Panel from '../components/panel/panel';

storiesOf('Panel', module).add('Panel', () => (
  <Provider store={storeCreator}>
    <Panel />
  </Provider>
));
