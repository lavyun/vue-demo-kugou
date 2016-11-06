<template>
  <div class="header">
    <headLogo></headLogo>
    <rank-head v-if="rankInfo" :title="rankTitle"></rank-head>
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
      ...mapGetters(['rankInfo','rankTitle'])
    },
    name:'k-head',
    components:{headLogo,headNav,rankHead}
  }
</script>
