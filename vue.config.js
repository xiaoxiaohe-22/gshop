const px2rem = require('postcss-px2rem')
// 配置postcss-px2rem
const postcss = px2rem({
    remUnit: 37.5   //基准大小 baseSize，需要和rem.js中单位rem值占比一样相同
})
module.exports={
    lintOnSave:false,

    css: { // 添加postcss配置
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            }

        }
    },

    pluginOptions: {
      i18n: {
        locale: 'zh_CN',
        fallbackLocale: 'zh_CN',
        localeDir: 'locales',
        enableInSFC: false
      }
    }
}
