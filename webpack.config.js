const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js', // need to maybe change
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    publicPath: '/',
    compress: true,
    port: 8080,
    proxy: {
      '/':'http://localhost:3000/',
      '/wardrobe':'http://localhost:3000/',
      '/wardrobe/getItems':'http://localhost:3000/',
      '/outfits':'http://localhost:3000/',
      '/users':'http://localhost:3000/',
      '/login/:username/:password':'http://localhost:3000/',
    },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};
