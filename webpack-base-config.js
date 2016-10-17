/* eslint-disable no-var */
var path = require('path')
var webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    // Per https://github.com/dailymotion/hls.js/issues/187
    new webpack.NormalModuleReplacementPlugin(/^webworkify$/, 'webworkify-webpack')
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader'
        // config in .babelrc
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        loaders: ['css', 'sass?includePaths[]='
            + require('node-bourbon').includePaths
            + '&includePaths[]='
            + path.resolve(__dirname, './src/base/scss')
        ],
        include: path.resolve(__dirname, 'src')
      },
      {
        exclude: /node_modules/,
        test: /\.(png|woff|eot|ttf|swf|cur)/, loader: 'url-loader?limit=1'
      },
      {
        exclude: /node_modules/,
        test: /\.svg/, loader: 'svg-inline'
      },
      {
        exclude: /node_modules/,
        test: /\.html/, loader: 'html?minimize=false'
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js']
  }
}
