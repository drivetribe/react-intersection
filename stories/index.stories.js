import React from 'react';
import { IntersectionElement, IntersectionRoot } from '../src';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const IntersectionElementDemo = () => (
  <IntersectionRoot viewport>
    <div style={{ paddingTop: '200vh' }}>
      <IntersectionElement once onChange={console.log}>
        <div style={{ width: '300px', height: '300px', background: 'red' }} />
      </IntersectionElement>
    </div>
  </IntersectionRoot>
);

storiesOf('React Intersection', module)
  .add('IntersectionElement', IntersectionElementDemo);
