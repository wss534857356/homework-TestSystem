var path = require('path');
// var webpack = require('webpack');

module.exports = {
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["es2015", "stage-0", "react"],
      },
    }]
  }
}

var src = path.join(__dirname, '..', '..', 'src')
var fs = require('fs')
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { 'react-router-redux': src } }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loader: 'babel-loader',
    query: {
      "presets": ["es2015", "stage-0", "react"]
    },
    include: src
  });
}
