import React from 'react';
import LoadingIndicator from './LoadingIndicator';

export const WithLoading = Component =>  {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return (<Component {...props} />);
    return (LoadingIndicator());
  }
}

