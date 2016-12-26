<template>
  <div class="header">
    <headLogo></headLogo>
    <rank-head v-if="head.toggle" :title="head.title" :style="head.style"></rank-head>
    <head-nav v-else></head-nav>
  </div>
</template>

<script type="es6">
  import headLogo from './head_logo';
  import headNav from './head_nav'
  import rankHead from './rank-head'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['head'])
    },
    name: 'k-head',
    components: {headLogo, headNav, rankHead}
  }
</script>
