const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyes-webpack-plugin')

module.exports = {
  devtool: 'false',
  entry: ['babel-polyfill', './src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'prod'),
    publicPath: '/',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {test: /\.png|.jpg|.gif$/, use: 'file-loader?name=Assets/Images/[name].[ext]'},
      {test: /\.ttf$/, use: 'file-loader?name=fonts/[name].[ext]'},
      { test: /\.tsx?$/, loader: 'babel-loader?presets[]=es2015!ts-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      minimize: true,
      compress: false
    }),
  ],
}