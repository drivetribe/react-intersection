import React from 'react';
import { IntersectionElement, IntersectionRoot } from '../src';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const IntersectionElementDemo = () => (
  <div style={{ paddingTop: '200vh' }}>
    <IntersectionElement onChange={console.log}>
      <div style={{ width: '300px', height: '300px', background: 'red' }} />
    </IntersectionElement>
  </div>
);

const IntersectionElementRootDemo = () => (
  <IntersectionRoot viewport>
    <div style={{ paddingTop: '200vh' }}>
      <IntersectionElement onChange={console.log}>
        <div style={{ width: '300px', height: '300px', background: 'red' }} />
      </IntersectionElement>
    </div>
  </IntersectionRoot>
);

storiesOf('React Intersection', module)
  .add('IntersectionElement without root', IntersectionElementDemo)
  .add('IntersectionElement with root', IntersectionElementRootDemo);
