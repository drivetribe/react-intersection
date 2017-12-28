import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

export default class IntersectionElement extends Component {
  static contextTypes = {
    observe: PropTypes.func,
    unobserve: PropTypes.func
  };

  componentDidMount() {
    const { observe } = this.context;
    this.node = findDOMNode(this);
    observe(this.node);
  }

  componentWillUnmount() {
    const { unobserve } = this.context;
    unobserve(this.node);
  }

  render() {
    return this.props.children;
  }
}
