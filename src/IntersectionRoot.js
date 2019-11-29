// @flow
import * as React from 'react';
import IntersectionObserverWrapper from './intersection-observer';
import { IntersectionRootContext } from './intersection-root-context';

import type { OnChange } from './types';

type Props = {
  children: React$Element<any>,
  viewport?: boolean,
  margin?: string,
  threshold?: number[]
};

const deepCompareArray = (a: number[], b: number[]) =>
  a.every((item, i) => item === b[i]);

export default class IntersectionRoot extends React.Component<Props> {
  intersectionObserver: IntersectionObserverWrapper;

  static defaultProps = {
    viewport: false
  };

  constructor(props: Props) {
    super(props);
    this.initIntersectionObserver(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    const { viewport, margin, threshold } = this.props;
    const thresholdHasChanged =
      prevProps.threshold &&
      threshold &&
      deepCompareArray(prevProps.threshold, threshold);

    if (
      prevProps.viewport !== viewport ||
      prevProps.margin !== margin ||
      thresholdHasChanged
    ) {
      this.initIntersectionObserver(this.props);
    }
  }

  componentWillUnmount() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  node: HTMLElement;

  initIntersectionObserver({ viewport, margin, threshold }: Props) {
    const root = viewport === true ? null : this.node;

    if ((root && root instanceof HTMLElement) || root === null) {
      const props = {
        root,
        rootMargin: margin,
        threshold
      };

      if (this.intersectionObserver) {
        this.intersectionObserver.reconnect(props);
      } else {
        this.intersectionObserver = new IntersectionObserverWrapper(props);
      }
    }
  }

  render() {
    const { children, viewport } = this.props;

    const contextValue = {
      observe: (child: HTMLElement, onChange: OnChange) =>
        this.intersectionObserver.observe(child, onChange),
      unobserve: (child: HTMLElement) =>
        this.intersectionObserver.unobserve(child)
    };

    return (
      <IntersectionRootContext.Provider value={contextValue}>
        {viewport
          ? children
          : React.Children.only(
              React.cloneElement(children, {
                ref: (node: any) => {
                  this.node = node;
                  const { ref } = children;

                  if (typeof ref === 'function') {
                    ref(node);
                  } else if (ref !== null) {
                    ref.current = node;
                  }
                }
              })
            )}
      </IntersectionRootContext.Provider>
    );
  }
}
