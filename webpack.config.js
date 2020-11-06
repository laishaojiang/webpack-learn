/*
 * @Author: laishaojiang
 * @Date: 2020-11-03 19:27:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 12:17:37
 * @
# Description: 
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TxtWebpackPlugin = require('./myPlugins/txt-webpack-plugin')

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"]
    }),
    new TxtWebpackPlugin()
  ],
  devServer: {
    port: 8080,
    contentBase: './dist',
    open: true
  }
}