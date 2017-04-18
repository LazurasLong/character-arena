import ExtractTextPlugin from 'extract-text-webpack-plugin';
import mqpacker from 'css-mqpacker';

import baseConfig, {
  IMAGES_REGEX,
  CSS_REGEX,
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
        include: IMAGES_PATH,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[path][name]_[hash].[ext]',
        },
      },
      // {
      //   test: IMAGES_REGEX,
      //   include: IMAGES_PATH,
      //   exclude: [/node_modules/, WEBAPP_ICONS_PATH],
      //   loader: 'file-loader',
      //   options: {
      //     name: '[path][name]_[hash].[ext]',
      //   },
      //   // use: [
      //   //   IMAGE_OPTIMIZER,
      //   // ],
      // },
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

    ...baseConfig.plugins,
  ],
};
