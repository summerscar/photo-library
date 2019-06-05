module.exports = {
    devServer: {
      open: true
    },
    publicPath: process.env.TYPE === 'github' ? '/photo-library/' : '/',
    productionSourceMap: false,
    chainWebpack: config => {
      config.module
        .rule('fix')
        .test(/\.(PNG|JPE?G|GIF|WEBP)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .end()
    },
    pluginOptions: {
      webpackBundleAnalyzer: {
        openAnalyzer: false
      }
    }
  }