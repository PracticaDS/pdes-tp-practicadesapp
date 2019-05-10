import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import storeCreator from '../storeCreator'
import Panel from '../components/panel/panel'
import { Provider } from 'react-redux'


storiesOf('Panel', module)
  .add('Panel', () =>
    <Provider store={storeCreator}>
      <Panel />
    </Provider>
  )