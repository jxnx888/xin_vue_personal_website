'use strict'
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const date = new Date();
const Timestamp = String(String(String(String(date.getFullYear()) + (date.getMonth() + 1)) + date.getDate()) + date.getHours()) + date.getMinutes();

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  runtimeCompiler: true, //关键点在这
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  chainWebpack: (config) => {
    config
      .plugin('provide')
      .use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }
      ])
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src' ))

    // 给js和css配置版本号
    config.output.filename('js/[name].' + Timestamp + '.js').end();
    config.output.chunkFilename('js/[name].' + Timestamp + '.js').end();
    config.plugin('mini-css-extract-plugin')
      .use(MiniCssExtractPlugin, [{
        filename: `css/[name].${Timestamp}.css`,
        chunkFilename: `css/[name].${Timestamp}.css`
      }]).end()
  },
  configureWebpack: (config) => {
    /*if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }*/
    // 将每个依赖包打包成单独的js文件
    let optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        // 你的配置
      },
      minimizer: [
        new UglifyPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,	// config.build.productionSourceMap
          parallel: true	// 并行任务构建
        })
      ]
    }
    Object.assign(config, {
      optimization
    })

  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: null, // string | Object
    before: app => {
    }
  }
}
