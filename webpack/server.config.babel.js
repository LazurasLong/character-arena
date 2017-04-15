import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import baseConfig, { ROOT_PATH, SRC_PATH, DIST_PATH, ASSETS_REGEX } from './base.config.babel.js';

export default {
  entry: path.resolve(SRC_PATH, 'server'),

  output: {
    path: DIST_PATH,
    filename: 'index.js',
  },

  target: 'node',

  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  node: {
    // __filename: true,
    __dirname: true,
  },

  module: {
    ...baseConfig.module,
    /*
    rules: [
      ...baseConfig.module.rules,
      {
        include: path.resolve(ROOT_PATH, 'config.js'),
        loader: 'babel-loader',
      },
    ],
    */
  },

  resolve: {
    ...baseConfig.resolve,
  },

  plugins: [new webpack.IgnorePlugin(ASSETS_REGEX)],
};
