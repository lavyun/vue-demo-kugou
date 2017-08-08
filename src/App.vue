<template>
  <div id="app">
    <Head />
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Player />
	  <DetailPlayer />
	</div>
</template>

<script>
  import Head from './components/header/Head'
  import Player from './components/Player'
  import DetailPlayer from './components/DetailPlayer'
  export default {
    components: {
      Head, Player, DetailPlayer
    }
  }
</script>

