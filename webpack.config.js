const path = require('path');
const package = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  resolve: { extensions: ['.js'] },
  devServer: {
    contentBase: [
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'assets'),
    ],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(s*)css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'app.bundle.css' }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Star Wars - The force awakens',
      template: './src/index.html',
      chunks: ['app'],
      path: path.join(__dirname, './dist/'),
      filename: 'index.html',
    }),
  ],
};
