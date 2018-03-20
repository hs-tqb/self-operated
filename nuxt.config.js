

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '自营降水',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src:'http://res.wx.qq.com/open/js/jweixin-1.2.0.js' },
      { src:'/js/wxconfig.js' }
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    {src:'~/assets/css/main.css'},
    {src:'~/assets/css/common.less', lang:'less'},
  ],
  /*
  ** Add axios globally
  */
  env: {
    RUN_ENV:process.env.RUN_ENV
  },
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    // extend (config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
