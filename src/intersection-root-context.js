// @flow
import * as React from 'react';

export const IntersectionRootContext: React$Context<any> = React.createContext({
  observe: null,
  unobserve: null
});
