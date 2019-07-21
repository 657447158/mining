module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/styles/global.scss";`
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    devServer: {
        proxy: {
            '/ltc': {
                changeOrigin: true,
                target: 'http://129.211.29.207:8083/wallet',
                pathRewrite: {
                    '^/ltc': ''
                }
            },
            '/wallet/': {
                changeOrigin: true,
                target: 'http://129.211.29.207:8083',
                // 这个是本地的开发调试的环境
                pathRewrite: {
                    '^/wallet/': '/wallet/'
                }
            },
        }
    }
}
