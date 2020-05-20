import React, { Component } from 'react';
import BadConnection from '../components/Errors/BadConnection';

export default class lazyLoadingErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };

  render() {
    if (this.state.hasError) {
      return <BadConnection />;
    }
    return this.props.children;
  }
}
