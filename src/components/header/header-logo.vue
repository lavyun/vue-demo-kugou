<template>
  <div class="logo-container">
    <div class="head-logo">
      <a href="#">
        <img src="http://m.kugou.com/v3/static/images/index/logo.png" />
      </a>
    </div>
    <div class="head-search" @click="searchRouter">
      <img src="http://m.kugou.com/v3/static/images/index/search.png" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    searchRouter () {
      this.$store.commit('showDetailPlayer', false)
      this.$router.push({ path: '/search' })
    }
  }
}
</script>

<style lang="less" scoped>
.logo-container {
  padding: 10px;
  background-color: #2ca2f9;
  overflow: hidden;
  height: 51px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1050;

  .head-logo {
    float: left;
    height: 100%;

    img {
      height: 100%
    }
  }

  .head-search {
    float: right;
    height: 31px;
    padding: 3px 0;

    img {
      height: 100%;
    }
  }
}
</style>
