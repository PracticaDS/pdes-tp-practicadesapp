import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Panel from '../components/panel/panel'

storiesOf('Panel', module)
  .add('Panel', () =>
    <Panel/>
  )