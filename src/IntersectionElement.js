// @flow
import * as React from 'react';
import IntersectionObserverWrapper from './intersection-observer';
import { IntersectionRootContext } from './intersection-root-context';

import type { OnChange } from './types';

type Props = {
  children: React$Element<any>,
  once?: boolean,
  onChange: OnChange
};

let defaultObserver: IntersectionObserverWrapper;

const getDefaultObserver = () => {
  if (!defaultObserver) {
    defaultObserver = new IntersectionObserverWrapper({});
  }
  return defaultObserver;
};

export default class IntersectionElement extends React.Component<Props> {
  static contextType = IntersectionRootContext;

  node: ?HTMLElement;
  observe: (node: HTMLElement, onChange: OnChange) => any;
  unobserve: (node: HTMLElement) => any;

  componentDidMount() {
    const { observe, unobserve } = this.context;

    if (this.node && this.node instanceof HTMLElement) {
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
    return React.Children.only(
      React.cloneElement(this.props.children, {
        ref: (node: any) => {
          this.node = node;
          const { ref } = this.props.children;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        }
      })
    );
  }
}
