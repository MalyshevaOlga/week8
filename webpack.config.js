const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pages = ["flexbox", "week4"];
module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/pages/${page}/index.js`;
    return config;
  }, {}),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    /** Будет запускать сервер на localhost:8080 в этой папке*/
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  watch: true,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      /** Babel **/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      /** HTML */
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      /** CSS */
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      /** Картинки */
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      /** Шрифты */
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/pages/${page}/index.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    ),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ),
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
