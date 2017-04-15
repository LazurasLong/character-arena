import webpack from 'webpack';

import writeStats from './utils/write-stats';
import startExpress from './utils/start-express';

import baseConfig, {
  SRC_PATH,
  WEBAPP_ICONS_PATH,
  CSS_REGEX,
  ASSETS_REGEX,
  LOADER_POSTCSS,
  LOADER_SASS,
} from './base.config.babel.js';

export const HOST = 'localhost';
export const PORT = 3001;

const PUBLIC_PATH = `//${HOST}:${PORT}/assets/`;

// https://webpack.github.io/docs/configuration.html
export default {
  ...baseConfig,

  devtool: 'cheap-module-source-map',

  entry: [
    ...baseConfig.entry,

    `webpack-hot-middleware/client?path=//${HOST}:${PORT}/__webpack_hmr`,
  ],

  output: {
    ...baseConfig.output,

    publicPath: PUBLIC_PATH,
  },

  module: {
    ...baseConfig.module,

    rules: [
      ...baseConfig.module.rules,

      {
        test: /\.png$/,
        include: WEBAPP_ICONS_PATH,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[path][name]_[hash].[ext]',
        },
      },
      {
        test: ASSETS_REGEX,
        include: SRC_PATH,
        exclude: [/node_modules/, WEBAPP_ICONS_PATH],
        loader: 'file-loader',
        options: {
          name: '[path][name]_[hash].[ext]',
        },
      },
      {
        test: CSS_REGEX,
        include: SRC_PATH,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          LOADER_POSTCSS,
          LOADER_SASS,
        ],
      },
    ],
  },

  // TODO: Refactor to extend from baseConfig
  plugins: [
    // Hot Reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    function writeStatsWhenPluginsDone() {
      this.plugin('done', writeStats);
    },
    function startExpressWhenPluginsDone() {
      this.plugin('done', startExpress);
    },
  ],
};
