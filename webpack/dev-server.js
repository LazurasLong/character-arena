import express from 'express';
import debug from 'debug';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './dev.config.babel.js';

const PORT = 3001;
const publicPath = config.output && config.output.publicPath;

debug.enable('dev,prod');

const app = express();
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    stats: {
      colors: true,
    },
  }),
);

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, '0.0.0.0', () => {
  debug('dev')('`webpack-dev-server` listening on port %s', PORT);
});
