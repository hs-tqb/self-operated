<style lang="less">
  // @import url(~assets/css/variable.less);
</style>

<template>
  <div id="__root" :data-page="$route.name">
    <nuxt class="page-container" />
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '~/plugins/axios'
Vue.prototype.$http = axios

export default {
  components: {}
}
</script>
