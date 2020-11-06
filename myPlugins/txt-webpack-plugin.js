/*
 * @Author: laishaojiang
 * @Date: 2020-11-05 12:03:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 12:38:39
 * @
# Description: 个打包清单插件 打包结束后，输出⽬录多出⼀个fileList.txt,内容：bundle⽂件的数量，以及全称
 */
// 做⼈嘛，最重要的是开⼼
class TxtWebpackPlugin {
  constructor(options) {
    console.log(options)
  }
  apply(complier) {
    console.log('he')
    complier.hooks.emit.tapAsync('TxtWebpackPlugin', (compilation, cb) => {
      console.log(compilation.assets)
      compilation.assets['fileList.txt'] = {
        source: function() {
          let bundles = Object.keys(compilation.assets)
          return `
            bundle文件数量：${bundles.length}
            名称：${bundles.join(' ')}
          `
        },
        size: function() {
          return 1024
        }
      }

      cb()
    })
  }
}

module.exports = TxtWebpackPlugin