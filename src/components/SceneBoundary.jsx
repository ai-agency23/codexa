import { Component } from 'react';

export default class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('The WebGL scene could not be rendered.', error);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}
