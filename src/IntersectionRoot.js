// @flow
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import IntersectionObserverWrapper from './intersection-observer';

import type { OnChange } from './types';

type Props = {
  children: React.Node,
  viewport?: boolean,
  margin?: string,
  threshold?: number[]
};

export default class IntersectionRoot extends React.Component<Props> {
  intersectionObserver: IntersectionObserverWrapper;

  static defaultProps = {
    viewport: false
  };

  static childContextTypes = {
    observe: PropTypes.func,
    unobserve: PropTypes.func
  };

  componentWillMount() {
    this.initIntersectionObserver(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { viewport, margin, threshold } = this.props;

    if (nextProps.viewport !== viewport || nextProps.margin !== margin || nextProps.threshold !== threshold) {
      this.intersectionObserver.reconnect(nextProps);
    }
  }

  componentWillUnmount() {
    this.intersectionObserver.disconnect();
  }

  getChildContext() {
    return {
      observe: (child: HTMLElement, onChange: OnChange) => this.intersectionObserver.observe(child, onChange),
      unobserve: (child: HTMLElement) => this.intersectionObserver.unobserve(child)
    };
  }

  initIntersectionObserver({ viewport, margin, threshold }: Props) {
    const root = viewport === true ? null : findDOMNode(this);

    if ((root && root instanceof HTMLElement) || root === null) {
      this.intersectionObserver = new IntersectionObserverWrapper({
        root,
        rootMargin: margin,
        threshold
      });
    }
  }

  render() {
    return this.props.children;
  }
}
