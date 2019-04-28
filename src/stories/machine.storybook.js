import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Machine from '../components/machine'

storiesOf('Machine', module)
  .add('Seller', () =>
    <Machine image='seller'/>
  )