import debug from 'debug';

export default (imagePath) => {
  const images = require('../server/webpack-stats.json').images;

  // Find the correct image
  const regex = new RegExp(`${imagePath}$`);
  const image = images.find(img => regex.test(img.original));

  // Serve image.
  if (image) return image.compiled;

  // Serve a not-found asset maybe?
  return '';
};
