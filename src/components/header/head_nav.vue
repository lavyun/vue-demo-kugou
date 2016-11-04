<template>
  <div>
    <mt-navbar v-model="selected" class="container"  @click.native="goRouter">
      <mt-tab-item id="head-nav1">新歌</mt-tab-item>
      <mt-tab-item id="head-nav2">排行</mt-tab-item>
      <mt-tab-item id="head-nav3">歌单</mt-tab-item>
      <mt-tab-item id="head-nav4">歌手</mt-tab-item>
      <mt-tab-item id="head-nav5">彩铃</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script type="es6">
  import { Navbar, TabItem } from 'mint-ui';

  export default {
    name:'head-nav',
    data(){
      return {
        selected:'head-nav1'
      }
    },
    components:{Navbar, TabItem},
    methods:{
      goRouter(){
        var navItem=this.selected.charAt(this.selected.length-1);
        switch(navItem){
          case '1':this.$router.push({path:'index'});break;
          case '2':this.$router.push({path:'rank'});break;
          case '3':this.$router.push({path:'plist'});break;
          case '4':this.$router.push({path:'singer'});break;
          case '5':this.$router.push({path:'ringtone'});break;
        }
      }
    }
  }
</script>

<style>
  .mint-tab-item{padding: 12px 0 !important;}
  .mint-tab-item-label{font-size: 16px !important;}
</style>
