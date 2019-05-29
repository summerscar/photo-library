module.exports = {
    devServer: {
      open: true
    },
    chainWebpack: config => {
      config.module
        .rule('fix')
        .test(/\.(PNG|JPE?G|GIF|WEBP)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .end()
    }
  }