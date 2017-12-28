// @flow
import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

export default class IntersectionRoot extends Component {
  observedQueue: HTMLElement[] = [];
  observedMap: WeakMap = new WeakMap();
  intersectionObserver: IntersectionObserver;

  static defaultProps = {
    viewport: false,
    margin: '0px',
    threshold: [0, 1]
  };

  static childContextTypes = {
    observe: PropTypes.func,
    unobserve: PropTypes.func
  };

  componentDidMount() {
    this.initIntersectionObserver();
    this.flushQueue();
  }

  componentWillUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.intersectionObserver.disconnect();
      this.initIntersectionObserver();
    }
  }

  componentWillUnmount() {
    this.intersectionObserver.disconnect();
  }

  getChildContext() {
    return {
      observe: this.observe,
      unobserve: this.unobserve
    };
  }

  initIntersectionObserver() {
    const { viewport, margin, threshold } = this.props;

    this.intersectionObserver = new IntersectionObserver(this.fireListeners, {
      root: viewport === true ? null : findDOMNode(this),
      rootMargin: margin,
      threshold
    });
  }

  flushQueue() {
    if (!this.intersectionObserver) return;
    this.observedQueue.forEach(({ child, onChange }) => this.observedMap.set(child, onChange));
  }

  fireListener = (entry) => {
    const onChange = this.observedMap.get(entry.target);
    if (onChange) onChange(entry);
  };

  fireListeners = (entries) => entries.forEach(this.fireListener);

  observe = (child, onChange) => {
    this.observedQueue.push({ child, onChange });
    this.flushQueue();
  };

  unobserve = (child) => {
    this.observedMap.delete(child);
    this.intersectionObserver.unobserve(child);
  };

  render() {
    return this.props.children;
  }
}
