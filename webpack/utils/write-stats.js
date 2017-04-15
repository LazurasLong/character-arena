import fs from 'fs';
import path from 'path';

const filepath = path.resolve(__dirname, '../../src/server/webpack-stats.json');

export default function (stats) {
  const publicPath = this.options.output.publicPath;
  const statsJson = stats.toJson();

  const getAssets = ext =>
    statsJson.assetsByChunkName.main
      .filter(asset => ext.test(asset))
      .map(asset => `${publicPath}${asset}`);

  const script = getAssets(/\.js$/);
  const style = getAssets(/\.css$/);

  // Find compiled images in modules
  // it will be used to map original filename to the compiled one
  // for server side rendering
  const imagesRegex = /\.(jpe?g|png|gif|svg)$/;
  const images = statsJson.modules.filter(module => imagesRegex.test(module.name)).map((image) => {
    let compiled;

    const asset = image.assets[0];

    if (asset === undefined) {
      // Take image in base64 from source
      compiled = image.source && image.source.replace(/^(module.exports = ")/, '').slice(0, -1);
    } else {
      compiled = `${publicPath}${asset}`;
    }

    return {
      original: image.name,
      compiled,
    };
  });

  const content = { script, style, images };

  fs.writeFileSync(filepath, JSON.stringify(content));
}
