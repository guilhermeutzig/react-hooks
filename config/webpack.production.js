const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

var sass = require('node-sass');
var sassUtils = require('node-sass-utils')(sass);

const commonConfig = require('./common.json');

module.exports = {
  entry: ['@babel/polyfill', resolve(__dirname, '../src/app.jsx')],
  devtool: false,
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
                resolve(__dirname, '../src/js'),
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: resolve(__dirname, '../'),
      allowExternal: true
    }),
    new HtmlWebpackPlugin({
      title: commonConfig.title,
      description: commonConfig.description,
      keywords: commonConfig.keywords,
      og: commonConfig.og,
      namespace: commonConfig.namespace,
      template: '../src/index.html',
      filename: 'index.html',
      inlineSource: '.(js|css|scss)$'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles_[hash].css',
      chunkFilename: '[name]_[id].css'
    })
  ]
};
