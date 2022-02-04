import React from 'react';
import PropTypes from 'prop-types';

import Error from '@components/Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    const childNow = React.Children.only(this.props.children);
    const childPrev = React.Children.only(prevProps.children);

    if (childNow !== childPrev) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <Error title={'Oops!'} description={'Something went wrong.'} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};

export default ErrorBoundary;
