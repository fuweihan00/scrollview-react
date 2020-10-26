const merge = require('webpack-merge');
const base = require('./webpack.config');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist'
  },
  devtool: "source-map",
  optimization: {    // 1. 这个配置必须
    minimize: false
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
});