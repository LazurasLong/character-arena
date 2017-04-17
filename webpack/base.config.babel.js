import path from 'path';
import webpack from 'webpack';
import jsonImporter from 'node-sass-json-importer';

import writeStats from './utils/write-stats';
import postcssConfig from '../postcss.config';

import { TITLE } from '../src/constants/app.js';

const ROOT_PATH = path.resolve(__dirname, '..');

const JS_REGEX = /\.jsx?$/;
const CSS_REGEX = /\.s?css$/;
const ASSETS_REGEX = /\.(jpe?g|png|gif|svg)?$/;

const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const WEBAPP_ICONS_PATH = path.resolve(ROOT_PATH, 'src');

const POSTCSS_PLUGINS = postcssConfig.plugins;

const LOADER_POSTCSS = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: [...postcssConfig.plugins],
  },
};

const LOADER_SASS = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    importer: jsonImporter,
  },
};

// https://webpack.github.io/docs/configuration.html
const webpackConfig = {
  devtool: 'source-map',

  entry: ['babel-polyfill', './src/client/'],

  output: {
    path: path.resolve(DIST_PATH, 'assets'),
    filename: '[name]-[hash].js',
    publicPath: '/assets/',
  },

  module: {
    rules: [
      {
        test: JS_REGEX,
        include: SRC_PATH,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  plugins: [
    function writeStatsWhenPluginsDone() {
      this.plugin('done', writeStats);
    },
  ],
};

export {
  webpackConfig as default,
  DIST_PATH,
  SRC_PATH,
  WEBAPP_ICONS_PATH,
  CSS_REGEX,
  ASSETS_REGEX,
  LOADER_POSTCSS,
  LOADER_SASS,
};
