const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',

  devServer: {
    open: false,
    host: 'localhost',
    port: 8081,
    proxy: {
      '/srv/': {
        target: 'http://192.168.1.33:8001/',
        changeOrigin: true,
        pathRewrite: {
          '^/srv': '/WebService',
        },
      },
    }
  }
});
