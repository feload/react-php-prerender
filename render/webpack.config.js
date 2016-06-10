'use strict';

var webpack = require('webpack');

module.exports = {
    entry: './components/bundle.js',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        filename: '../public/dist/bundle.js'
    }
};