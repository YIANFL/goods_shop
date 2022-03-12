module.exports = {
  productionSourceMap: false,
  // 关闭eslint
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      // 前端发送请求的时候,路径中存在/api,代理服务器向后台服务器要数据
      '/api': {
        // 代理服务器向
        // 数据来自于哪台服务器
        target: 'http://39.98.123.211'
        // 路径重写
        // pathRewrite: { '^/api': '' }
      }
    }
  }
}
