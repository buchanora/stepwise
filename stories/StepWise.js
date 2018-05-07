import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Stepwise} from '../src/index';


export default storiesOf('Stepwise', module)
  .add('without value', () => (
    <Stepwise  label='My Date Field' 
                onChange={action('change')}/>
  ))