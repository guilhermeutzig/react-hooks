const { resolve } = require('path');
const webpack = require('webpack');

const commonConfig = require('./common.json');

module.exports = {
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    stats: 'errors-only',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    open: false
  },
  output: {
    filename: 'bundle_[hash].js',
    path: resolve(__dirname, '../public'),
    publicPath: '/'
  },
  performance: { hints: false },
  context: resolve(__dirname, '../src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico|mp4|mov|svg|webm|pdf|zip)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              useRelativePath: false,
              outputPath: 'assets',
              context: 'assets'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets',
              context: 'assets'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.svg', '.pdf', '.zip', 'mp4', 'jpg', 'png'],
    alias: {
      styles: resolve(__dirname, '../src/styles'),
      config: resolve(__dirname, '../src/config'),
      structure: resolve(__dirname, '../src/structure'),
      pages: resolve(__dirname, '../src/pages'),
      constants: resolve(__dirname, '../src/constants'),
      components: resolve(__dirname, '../src/structure/components'),
      icons: resolve(__dirname, '../src/structure/icons'),
      commons: resolve(__dirname, '../src/structure/commons'),
      containers: resolve(__dirname, '../src/structure/containers'),
      assets: resolve(__dirname, '../assets')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      env: JSON.stringify(process.env.NODE_ENV),
      config: JSON.stringify(require(`./${process.env.NODE_ENV}.json`)),
      common: JSON.stringify(commonConfig),
      ns: JSON.stringify(commonConfig.namespace)
    })
  ]
};
