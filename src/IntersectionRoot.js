import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

export default class IntersectionRoot extends Component {
  observers: HTMLElement[];
  intersectionObserver: IntersectionObserver;

  static defaultProps = {
    margin: '0px',
    threshold: [0, 1]
  };

  static childContextTypes = {
    observe: PropTypes.func,
    unobserve: PropTypes.func
  };

  componentDidMount() {
    const { root, margin, threshold } = this.props;
    this.intersectionObserver = new IntersectionObserver({
      root: root ? root : findDOMNode(this),
      rootMargin: margin,
      threshold
    });
  }

  componentWillUnmount() {
    this.intersectionObserver.disconnect();
  }

  setRoot = (ref) => {
    if (ref) this.root = ref;
  };

  observe = (child) => {
    this.intersectionObserver.observe(child);
  };

  unobserve = (child) => {
    this.intersectionObserver.unobserve(child);
  };

  render() {
    return children;
  }
}
