import React from 'react';
import imageResolver from '../utils/image-resolver.js';

import BuilderItem from '../components/BuilderItem.jsx';

const Builder = ({
  data,
  label,
  onError,
}) => {

  /* Error */
  if (data.error) {
    return <span className="Builder-item is-error">&#x2612; {onError}</span>;
  }

  /* Success */
  if (!data.error && !data.isFetching) {
    return <span className="Builder-item is-success">&#x2611; {label}</span>;
  }

  /* Fetch */
  return <span className="Builder-item">... {label}</span>
};

Builder.displayName = 'Builder';
export default Builder;