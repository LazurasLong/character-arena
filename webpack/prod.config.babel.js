import ExtractTextPlugin from 'extract-text-webpack-plugin';
import mqpacker from 'css-mqpacker';

import baseConfig, {
  SRC_PATH,
  WEBAPP_ICONS_PATH,
  ASSETS_REGEX,
  CSS_REGEX,
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
          name: 'images/favicons/[name]_[hash].[ext]',
        },
      },
      {
        test: ASSETS_REGEX,
        include: SRC_PATH,
        exclude: [/node_modules/, WEBAPP_ICONS_PATH],
        use: [
          {
            // inline base64 URLs for <=8k images, direct URLs for the rest
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name]_[hash].[ext]',
            },
          },
          IMAGE_OPTIMIZER,
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

    ...baseConfig.plugins,
  ],
};
