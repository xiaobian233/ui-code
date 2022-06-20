const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    globalSass(config)
  }
})


const globalSass = config => {
  const oneOfsMap = config.module.rule('scss').oneOfs.store
  oneOfsMap.forEach((item) => {
    item
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: './src/assets/css/common.scss'  //相对路径
      })
      .end()
  })
}