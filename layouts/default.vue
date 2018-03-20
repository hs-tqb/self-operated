<style lang="less">
  @import url(~assets/css/variable.less);
  .dialog-container { 
    position:fixed; top:0; left:0; z-index:100; width:100vw; height:100vh; 
    background-color: rgba(0,0,0,.7);
    transition-duration:300ms;
    pointer-events:none; opacity:0;
    &.show { pointer-events:auto; opacity:1; }
  }
  #dialog-message {
    .flow; .align(c); .justify(c);
    background-color:transparent;
    &.show{ pointer-events:none; }
    .inner-wrapper { 
      display:inline-block;
      margin-top:-150px;
      padding:14px; 
      max-width:70%;
      line-height:1.4;
      text-align:justify;
      color:#fff;
      background:rgba(51,51,51,.9) no-repeat center 12px;
      background-size:30px auto ; 
      box-shadow:0 0 3px 1px #777;
      border-radius:8px; 
      
      &[data-type] {
        padding-top:50px;
        &:empty { background-position:center 10px; padding-bottom:0; }
        min-width:50px;
        text-align:center;
      }
      &[data-type=success] { background-image:url(~assets/img/icons/success.png) }
      &[data-type=failure] { background-image:url(~assets/img/icons/failure.png) }
    }
  }
</style>

<template>
  <div id="__root" :data-page="$route.name">
    <nuxt class="page-container" />
    <!-- 全局消息弹窗 -->
    <div id="dialog-message" class="dialog-container" :class="messageDialog.show?'show':''">
      <div class="inner-wrapper" :data-type="messageDialog.type||''" v-if="messageDialog.html" v-html="messageDialog.html.trim()"></div>
      <div class="inner-wrapper" :data-type="messageDialog.type||''" v-else>{{messageDialog.text.trim()}}</div>
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
