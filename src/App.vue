<template>
  <div id="app">
    <k-head></k-head>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <player></player>
    <detail-player></detail-player>
  </div>
</template>

<script type="es6">
  import kHead from './components/header/head'
  import player from './components/player'
  import detailPlayer from './components/detail_player'
  export default {
    name: 'app',
    components: {
      kHead, player, detailPlayer
    }
  }
</script>

