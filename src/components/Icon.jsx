import React from 'react';
import imageResolver from '../utils/image-resolver.js';

const Icon = ({ className, icon }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/2000/xlink"
    viewBox="0 0 64 64"
  >
    <use xlinkHref={`${imageResolver('../images/blizzard-icons.svg')}#${icon}`} />
  </svg>
);

export default Icon;
