import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
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
  query: {
    // mozjpeg
    mozjpeg: {
      progressive: true,
      quality: 65,
    },
    // gifsicle
    gifsicle: {
      interlaced: true,
    },
    // optipng
    optipng: {
      optimizationLevel: 7,
    },
    // pngquant
    pngquant: {
      quality: '65-90',
      speed: 3,
      verbose: true,
    },
    // SVGO
    svgo: {
      plugins: [
        {cleanupIDs: false},
      ],
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
        use: [
          IMAGE_OPTIMIZER,
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]_[hash].[ext]',
            },
          },
        ],
      },
      {
        test: IMAGES_REGEX,
        include: IMAGES_PATH,
        exclude: [/node_modules/, WEBAPP_ICONS_PATH],
        use: [
          IMAGE_OPTIMIZER,
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]_[hash].[ext]',
            },
          },
        ],
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
        // Using talent icons instead
        // {
        //   urlPattern: composeUrlPattern(SPEC_ICONS),
        //   handler: 'fastest',
        // },
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

    new CompressionPlugin({
      threshold: 20480,
      minRatio: 0.6,
    }),

    ...baseConfig.plugins,
  ],
};
