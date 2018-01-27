import * as webpack from 'webpack'

const path = require('path')

const config: webpack.Configuration = {
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {test: /\.png|.jpg|.gif$/, use: 'file-loader?name=Assets/Images/[name].[ext]'},
      {test: /\.ttf$/, use: 'file-loader?name=fonts/[name].[ext]'},
      {
        test: /\.tsx?$/,
        use: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
}
config.entry = [
  'react-hot-loader/patch',
  // activate HMR for React

  `webpack-dev-server/client?http://${config.devServer.host}:${config.devServer.port}`,
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint

  'webpack/hot/only-dev-server',
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates

  './src/index.tsx',
]

export default config
