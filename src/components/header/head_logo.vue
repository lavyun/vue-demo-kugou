<template>
  <div class="logo-container">
    <div class="head-logo">
      <a href="#">
        <img src="http://m.kugou.com/v3/static/images/index/logo.png">
      </a>
    </div>
    <div class="head-download">
      <a href="http://pan.baidu.com/s/1eSMb7e6">下载酷狗</a>
    </div>
    <div class="head-search" @click="searchRouter">
      <img src="http://m.kugou.com/v3/static/images/index/search.png">
    </div>
  </div>
</template>

<script type="es6">
  export default {
    name: 'head-logo',
    methods: {
      searchRouter(){
        this.$store.commit('showDetailPlayer',false);
        this.$router.push({path: '/search'});
      }
    }
  }
</script>
