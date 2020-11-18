const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const Proxy = require('./config/proxy.config')
const CopyWebpackPlugin = require('copy-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname,'./src/static'),
          to: 'static'
        } 
      ])
    ],
    // if prod, add externals
    // externals: isProd ? assetsCDN.externals : {}
    externals: {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@tools', resolve('src/tools'))
      .set('@service', resolve('src/service'))
      .set('@comp', resolve('src/components'))
      .set('@config', resolve('src/config'))
      .set('@util', resolve('src/utils'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config.plugin('html').tap((args) => {
    //     args[0].cdn = assetsCDN
    //     return args
    //   })
    // }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8600,
    proxy: Proxy,
    disableHostCheck:true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
}
// add `ThemeColorReplacer` plugin to webpack plugins
vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())

module.exports = vueConfig
