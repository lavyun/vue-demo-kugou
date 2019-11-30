<template>
  <div class="header">
    <header-logo></header-logo>
    <rank-header v-if="head.toggle" :title="head.title" :cStyle="head.style"></rank-header>
    <header-nav v-else></header-nav>
  </div>
</template>

<script>
import HeaderLogo from './header-logo'
import HeaderNav from './header-nav'
import RankHeader from './rank-header'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['head'])
  },
  components: {
    HeaderLogo,
    HeaderNav,
    RankHeader
  }
}
</script>
