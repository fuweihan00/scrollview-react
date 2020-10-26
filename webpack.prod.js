const merge = require('webpack-merge');
const base = require('./webpack.config');
const nodeExternals = require('webpack-node-externals');


module.exports = merge(base, {
  mode: 'production',
  entry: './src/scrollView.js',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()]
});