<style lang="less">
  @import url(~assets/css/variable.less);
  .dialog-container { 
    position:fixed; top:0; left:0; z-index:100; width:100vw; height:100vh; 
    background-color: rgba(0,0,0,.3);
    transition-duration:300ms;
    pointer-events:none; opacity:0;
    &.show { pointer-events:auto; opacity:1; }
  }
  #dialog-message {
    .flow; .align(c); .justify(c);
    background-color:transparent;
    &.show{ pointer-events:none; }
    p { 
      display:inline-block; 
      padding:7px 16px; 
      max-width:70%;
      line-height:1.4;
      text-align:justify;
      color:#fff;
      background-color:rgba(0,0,0,.7); 
      border-radius:5px; 
    }
  }
</style>

<template>
  <div id="__root" :data-page="$route.name">
    <nuxt class="page-container" />
    <!-- 全局消息弹窗 -->
    <div id="dialog-message" class="dialog-container" :class="messageDialog.show?'show':''">
      <p>{{messageDialog.text}}</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '~/plugins/axios'
Vue.prototype.$http = axios

export default {
  computed: {
    messageDialog() {
      return this.$store.state.messageDialog || {}
    }
  }
}
</script>
