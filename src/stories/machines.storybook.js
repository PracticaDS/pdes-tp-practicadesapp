import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Machines from '../components/machines/machines';

storiesOf('Machines', module).add('Machines', () => <Machines />);
