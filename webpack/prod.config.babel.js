import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import mqpacker from 'css-mqpacker';
import { composeUrlPattern } from '../src/utils/calcs.js';

import {
  SLUG,
  SITE_URL,
  SPEC_ICONS,
  TALENT_ICON,
  WOWPROGRESS_ICON,
  WORLDOFWARCRAFT_ICON,
} from '../src/constants/app.js';

import {
  BASE_URL,
  AVATAR_URL,
} from '../src/constants/apiRoutes.js';

import { version } from '../src/manifest.json';

import baseConfig, {
  IMAGES_REGEX,
  CSS_REGEX,
  DIST_PATH,
  SRC_PATH,
  WEBAPP_ICONS_PATH,
  IMAGES_PATH,
  LOADER_POSTCSS,
  LOADER_SASS,
} from './base.config.babel.js';

const IMAGE_OPTIMIZER = {
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
};

export default {
  ...baseConfig,

  output: {
    ...baseConfig.output,
    filename: '[name]-[hash].min.js',
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
        test: IMAGES_REGEX,
        include: IMAGES_PATH,
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              ...LOADER_POSTCSS,
              options: {
                ...LOADER_POSTCSS.options,
                plugins: [...LOADER_POSTCSS.options.plugins, mqpacker],
              },
            },
            LOADER_SASS,
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/[name]-[hash].min.css',
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: `${SLUG}-${version}`,
      minify: true,
      runtimeCaching: [
        // App itself
        {
          // urlPattern: new RegExp('http://localhost:3000/'),
          urlPattern: new RegExp(SITE_URL),
          handler: 'fastest',
        },

        // External icons
        {
          urlPattern: composeUrlPattern(SPEC_ICONS),
          handler: 'fastest',
        },
        {
          urlPattern: composeUrlPattern(TALENT_ICON),
          handler: 'fastest',
        },
        {
          urlPattern: composeUrlPattern(WOWPROGRESS_ICON),
          handler: 'fastest',
        },
        {
          urlPattern: composeUrlPattern(WORLDOFWARCRAFT_ICON),
          handler: 'fastest',
        },

        // API Request
        {
          urlPattern: composeUrlPattern(BASE_URL),
          handler: 'fastest',
        },

        // Character avatars
        {
          urlPattern: composeUrlPattern(AVATAR_URL),
          handler: 'fastest',
        },
      ],
    }),

    ...baseConfig.plugins,
  ],
};
