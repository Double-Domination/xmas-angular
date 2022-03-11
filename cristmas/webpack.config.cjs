// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HtmlLoader } = require('html-loader');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
console.log(`DM>>${!isProduction}`);

const config = {
  // context: path.resolve(__dirname, './'),
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
    liveReload: true,
    watchFiles: [path.resolve(__dirname, 'src')],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },

        {
          from: path.resolve(__dirname, 'src/assets/toys'),
          to: path.resolve(__dirname, 'dist/toys'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    new MiniCssExtractPlugin(),

    new CleanWebpackPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        exclude: /node_modules/,
        options: {
          minimize: false,
        },
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        use: [
          {
            // inject CSS to page
            loader: 'style-loader',
          },
          {
            // translates CSS into CommonJS modules
            loader: 'css-loader',
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require('autoprefixer')];
                },
              },
            },
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, 'src/assets/scss/_shared.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      // "@MODELS": path.resolve(__dirname, './src/models'),
      // "@SRC": path.resolve(__dirname, './src'),
      // "COMPONENTS": path.resolve(__dirname, './src/components'),
      // "SCSS": path.resolve(__dirname, './src/assets/scss'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
