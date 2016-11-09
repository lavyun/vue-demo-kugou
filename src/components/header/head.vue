<template>
  <div class="header">
    <headLogo></headLogo>
    <rank-head v-if="headInfo" :title="headTitle" :to="headRouter" :style="headStyle"></rank-head>
    <head-nav v-else></head-nav>

  </div>
</template>

<script type="es6">
  import headLogo from './head_logo';
  import headNav from './head_nav'
  import rankHead from './rank-head'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters(['headInfo','headTitle','headRouter','headStyle'])
    },
    name:'k-head',
    components:{headLogo,headNav,rankHead}
  }
</script>
