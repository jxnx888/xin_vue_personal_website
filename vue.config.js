const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
      configureWebpack: {
          plugins: [

              new webpack.ProvidePlugin({
                  $: "jquery",
                  jQuery: "jquery",
                  jquery:"jquery",
                  "windows.jQuery": "jquery"
              }),
              /*new TerserPlugin({
                  test: /\.js(\?.*)?$/i, //用来匹配需要压缩的文件。
                  include: /\/includes/, //匹配参与压缩的文件。
                  exclude: /\/excludes/, //匹配不需要压缩的文件。
                  parallel: true, // Boolean 启用/禁用多进程并发运行功能. Number 启用多进程并发运行并设置并发运行次数(parallel: 4,)。 使用多进程并发运行以提高构建速度
                  terserOptions: { //Terser 压缩配置 。
                      compress: {
                          pure_funcs: ["console.log"]
                      }
                  }
              })*/
          ],
          optimization: {
              minimize: true,
              minimizer: [
                  new TerserPlugin(),
              ],
          },
      }

    /*configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //生产环境配置
            config.plugins.push(new TerserPlugin())
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                jquery:"jquery",
                "windows.jQuery": "jquery"
            })
        }
        else{
            //开发环境配置
            new webpack.ProvidePlugin({
                $: "jquery",

                jQuery: "jquery",
                jquery:"jquery",
                "windows.jQuery": "jquery"

            })
        }
    }*/

}
