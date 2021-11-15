const webpack = require('webpack')
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      extensions: [ '.json', '.vue', '.js' ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        asset: path.resolve(__dirname, 'src/asset'),
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
    plugins: [
      /*new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: [ 'console.log' ],
          },
        },
        sourceMap: false,	// config.build.productionSourceMap
        parallel: true,	// 并行任务构建
      }),*/
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin()
      ]
    }
  }
}
