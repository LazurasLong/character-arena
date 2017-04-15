import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './dev.config.babel.js';

const port = 3001;
const publicPath = config.output && config.output.publicPath;

new WebpackDevServer(webpack(config), {
  publicPath,
}).listen(port, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server listening at 0.0.0.0:${port} => 🌍  http://localhost:${port}${publicPath || ''} 🌍`);
});
