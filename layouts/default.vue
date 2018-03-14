<style lang="less">
  @import url(~assets/css/variable.less);
  * { margin:0; padding:0; color:inherit; }
  body { font:14px/1 sans-serif; color:@color-text-regular; }
  .page-container { position:relative; z-index:10; min-height:100vh; }
</style>

<template>
  <div id="__root" :data-page="$route.name">
    <nuxt class="page-container" />
  </div>
</template>

<script>
export default {
  components: {}
}
</script>
