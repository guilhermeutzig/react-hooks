const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var sass = require('node-sass');
var sassUtils = require('node-sass-utils')(sass);

const commonConfig = require('./common.json');

module.exports = {
  entry: ['@babel/polyfill', 'react-hot-loader/patch', resolve(__dirname, '../src/app.jsx')],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?sourceMap',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolve(__dirname, '../postcss.config.js')
              }
            }
          },
          {
            loader: 'sass-loader?sourceMap',
            options: {
              includePaths: [
                resolve(__dirname, '../src/styles'),
                resolve(__dirname, '../src'),
                resolve(__dirname, '../assets'),
                resolve(__dirname, '../node_modules')
              ],
              importLoaders: 1,
              functions: {
                'getnamespace()': function() {
                  let result = commonConfig.namespace;
                  result = sassUtils.castToSass(result);
                  return result;
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    }),
    new HtmlWebpackPlugin({
      title: commonConfig.title,
      namespace: commonConfig.namespace,
      template: '../src/index-dev.html',
      filename: 'index.html'
    })
  ]
};
