<template>
  <div id="app">
      <k-head></k-head>
      <div class="main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <!--<transition>-->
        <!--<player v-show="audioFlag"></player>-->
      <!--</transition>-->
    <player></player>
  </div>
</template>

<script type="es6">
import kHead from './components/header/head'
import player from './components/player'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    kHead,player
  }
  //computed:{
  //  ...mapGetters(['audioFlag'])
  //}
}
</script>

<style>

</style>
