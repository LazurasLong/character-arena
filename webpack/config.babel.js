import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import postcssConfig from '../postcss.config';

import { TITLE } from '../src/constants/app.js';

const ROOT_PATH = path.resolve(__dirname, '..');

const JS_REGEX = /\.jsx?$/;
const CSS_REGEX = /\.s?css$/;
const ASSETS_REGEX = /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)(\?v=[0-9].[0-9].[0-9])?$/;

const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const POSTCSS_PLUGINS = postcssConfig.plugins;

// https://webpack.github.io/docs/configuration.html
const webpackConfig = {
  devtool: 'source-map',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    './src/server',
  ],

  output: {
     path: DIST_PATH,
    filename: 'wowCharacterComparision.js',
    // path: path.resolve(DIST_PATH, 'assets'),
    // filename: '[name]-[hash].js',
    // publicPath: '/assets/',
  },

  node: {
    fs: 'empty',
    net: 'empty',
  },

  module: {
    rules: [
      {
        test: JS_REGEX,
        loader: 'babel-loader',
        include: SRC_PATH,
        query: {
          presets:['react'],
        },
      },
      {
        test: CSS_REGEX,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: POSTCSS_PLUGINS,
            },
          },
          'sass-loader',
        ],
        include: SRC_PATH,
      },
      {
        test: ASSETS_REGEX,
        include: SRC_PATH,
        exclude: [/node_modules/],
        loader: 'image-webpack-loader',
        options: {
          progressive: true,
          gifsicle: {
            interlaced: true,
          },
          svgo: {
            cleanupIDs: false,
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: TITLE,
      template: 'src/templates/index.ejs',
    }),
  ],
};

export default webpackConfig;
