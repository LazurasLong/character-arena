import React from 'react';

const Error = ({error}) => {
  const { data } = error;
  
  return (
    <div className="Error">
        <span>{(data && data.reason) || 'Unexpected error'}</span>
    </div>
  )
};

export default Error;