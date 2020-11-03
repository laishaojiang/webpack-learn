/*
 * @Author: laishaojiang
 * @Date: 2020-11-03 19:27:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-03 20:28:16
 * @
# Description: 
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

const setMpa = function() {
  // 等价交换，炼金术不变原则
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
  console.log(entryFiles)
  entryFiles.map((entryFile, index) => {
    const match = entryFile.match(/src\/(.*)\/index\.js$/)
    const pageName = match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: `./src/${pageName}/index.html`,
      filename: `${pageName}.html`,
      chunks: [pageName]
    }))
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const { entry, htmlWebpackPlugins } = setMpa()
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }

    ]
  },
  plugins: [
    ...htmlWebpackPlugins
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    //   filename: "index.html",
    //   chunks: ["main"]
    // })
  ],
  devServer: {
    port: 8080,
    contentBase: './dist',
    open: true
  }
}