const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

const isProd = process.env.NODE_ENV === 'production';
module.exports = defineConfig({
  lintOnSave: false,
  publicPath: './', // 根路径
  outputDir: 'dist', // 构建输出目录
  transpileDependencies: true,
  devServer: {
    port: process.env.port,
    proxy: {
      'servicePath/': {
        target: 'http://www.baidu.com', //测试
        pathRewrite: { '^/servicePath': '' },
        changeOrigin: true
        // secure: false, // 接受 运行在 https 上的服务
      }
    }
  },
  css: {
    sourceMap: !isProd,
    extract: isProd
      ? {
          filename: 'static/css/[name].[hash:8].css',
          chunkFilename: 'static/css/[name].[hash:8].css'
        }
      : false
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/common/interface/api'),
        '@c': path.resolve(__dirname, './src/components'),
        '@img': path.resolve(__dirname, './src/assets/images'),
        '@utils': path.resolve(__dirname, './src/common/utils'),
        '@style': path.resolve(__dirname, './src/common/style'),
        '@constant': path.resolve(__dirname, './src/common/constant'),
        '@busi': path.resolve(__dirname, './src/common/business')
        // vue$: 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })
    ]
  }
  // configureWebpack: config => {
  //   Object.assign(config, {
  //     // 开发生产共同配置
  //     resolve: {
  //       extensions: ['.js', '.vue', '.json'],
  //       alias: {
  //         '@': path.resolve(__dirname, './src'),
  //         '@api': path.resolve(__dirname, './src/common/interface/api'),
  //         '@c': path.resolve(__dirname, './src/components'),
  //         '@img': path.resolve(__dirname, './src/assets/images'),
  //         '@utils': path.resolve(__dirname, './src/common/utils'),
  //         '@style': path.resolve(__dirname, './src/common/style'),
  //         '@constant': path.resolve(__dirname, './src/common/constant'),
  //         '@busi': path.resolve(__dirname, './src/common/business')
  //         // vue$: 'vue/dist/vue.esm.js'
  //       }
  //     },
  //     plugins: [
  //       ComponentsPlugin({
  //         resolvers: [VantResolver()]
  //       })
  //     ]
  //   });
  // }
});
