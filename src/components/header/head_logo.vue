<template>
  <div class="logo-container">
    <div class="head-logo">
      <a href="#">
        <img src="http://m.kugou.com/v3/static/images/index/logo.png" alt="">
      </a>
    </div>
    <div class="head-download"><a href="#">下载酷狗</a></div>
    <div class="head-search"  @click="searchRouter">
        <img src="http://m.kugou.com/v3/static/images/index/search.png" alt="">
    </div>
  </div>
</template>

<script type="es6">
  export default {
    name:'head-logo',
    data(){
      return {

      }
    },
    methods:{
      searchRouter(){
        this.$router.push({path:'search'})
      }
    }
  }

</script>
