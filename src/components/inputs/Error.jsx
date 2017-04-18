import React from 'react';

const Error = ({error}) => {
  const { data } = error;
  
  return (
    <div className="Error">
      <p className="Error-msg">{(data && data.reason) || 'Unexpected error'}</p>
    </div>
  )
};

export default Error;