<template>
  <div class="header">
    <HeadLogo />
    <RankHead v-if="head.toggle" :title="head.title" :cStyle="head.style" />
    <HeadNav v-else />
  </div>
</template>

<script type="es6">
  import HeadLogo from './HeadLogo';
  import HeadNav from './HeadNav'
  import RankHead from './RankHead'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['head'])
    },
    components: {HeadLogo, HeadNav, RankHead}
  }
</script>
