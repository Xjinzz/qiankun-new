const IS_PROD = [ 'production', 'prod' ].includes(process.env.NODE_ENV)

const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

// lazy load ant-design-vue
// if your use import on Demand, Use this code
plugins.push([
  'import',
  {
    libraryName: 'ant-design-vue',
    libraryDirectory: 'es',
    style: true // `style: true` 会加载 less 文件
  }
])
// 增加支持可选链/管道语法/双问号语法
plugins.push(['@babel/plugin-proposal-optional-chaining'])

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],
  plugins
}
