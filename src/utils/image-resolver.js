import debug from 'debug';

import { ENV } from '../../.env.js';

export default (imagePath) => {
  // Prod enviroment, loading images
  if (false) {
    const images = require('../server/webpack-stats.json').images;

    // Find the correct image
    const regex = new RegExp(`${imagePath}$`);
    const image = images.find(img => regex.test(img.original));

    // Serve image.
    if (image) return image.compiled;

    // Serve a not-found asset maybe?
    return '';
  
  // Dev enviroment, avoiding inifinite loop
  } else {
    return '';
  }
};
