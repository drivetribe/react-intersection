// @flow
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes, { instanceOf } from 'prop-types';
import IntersectionObserverWrapper from './intersection-observer';

import type { OnChange } from './types';

type Props = {
  children: React.Node,
  once?: boolean,
  onChange: OnChange
};

let defaultObserver: IntersectionObserverWrapper;
const getDefaultObserver = () => {
  if (!defaultObserver) defaultObserver = new IntersectionObserverWrapper({});
  return defaultObserver;
};

export default class IntersectionElement extends React.Component<Props> {
  static contextTypes = {
    observe: PropTypes.func,
    unobserve: PropTypes.func
  };

  node: HTMLElement;
  observe: (node: HTMLElement, onChange: OnChange) => any;
  unobserve: (node: HTMLElement) => any;

  componentDidMount() {
    const { observe, unobserve } = this.context;
    const node = findDOMNode(this);

    if (node && node instanceof HTMLElement) {
      this.node = node;

      this.observe = observe || getDefaultObserver().observe;
      this.unobserve = unobserve || getDefaultObserver().unobserve;

      this.observe(this.node, (entry: IntersectionObserverEntry) => {
        const { onChange, once } = this.props;
        onChange(entry);
        if (this.node && once && entry.isIntersecting) {
          this.unobserve(this.node);
          delete this.node;
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.unobserve(this.node);
      delete this.node;
    }
  }

  render() {
    return this.props.children;
  }
}
