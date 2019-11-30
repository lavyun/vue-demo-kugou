<template>
  <div class="header-nav">
    <mt-navbar v-model="routeName" class="container">
      <mt-tab-item id="newSongs">新歌</mt-tab-item>
      <mt-tab-item id="rank">排行</mt-tab-item>
      <mt-tab-item id="plist">歌单</mt-tab-item>
      <mt-tab-item id="singer">歌手</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
export default {
  name: 'head-nav',
  data () {
    let routeName = this.$route.name
    routeName = ['newSongs', 'rank', 'plist', 'singer'].includes(routeName) ? routeName : 'newSongs'
    return {
      routeName
    }
  },
  watch: {
    routeName (newV, oldV) {
      if (oldV !== newV) {
        this.$router.push({ path: newV })
      }
    }
  }
}
</script>

<style lang="less">
.header-nav{
  position: fixed;
  top: 51px;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #e4e4e4;

  .mint-tab-item {
    padding: 12px 0 !important;
  }

  .mint-tab-item-label {
    font-size: 16px !important;
  }

  .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0;
  }
}
</style>
