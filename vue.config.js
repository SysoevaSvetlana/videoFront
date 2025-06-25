const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {port: 3000,
     proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        //rewrite: path => path.replace(/^\/api/, '')
      },
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
