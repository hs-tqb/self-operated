<style lang="less">
  // @import url(~assets/css/variable.less);
  #page-browser { display:flex; justify-content:center; align-items:center; }
  #page-browser h1 { padding:0 20px; margin-top:-100px; font-size:18px; color:#333; }
</style>

<template>
  <div id="page-browser">
    <h1>请使用微信内置浏览器打开</h1>
  </div>
</template>

<script>
export default {
  asyncData ( { req, redirect} ) {
    // 自动跳转回首页
    // let userAgent = process.server? req.headers['user-agent']: navigator.userAgent;
    // if (userAgent.match(/MicroMessenger/i) === 'MicroMessenger') {
    //   redirect('/pay');
    // }
  },
  data () {
    return {}
  }
}
</script>
