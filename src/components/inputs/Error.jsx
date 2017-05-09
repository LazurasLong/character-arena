import React from 'react';

const Error = ({ error: { data } }) => (
  <div className="Error">
    <p className="Error-msg">{
      (data && data.reason)
      || (data && data.error)
      || 'Unexpected error'
    }</p>
  </div>
);

export default Error;