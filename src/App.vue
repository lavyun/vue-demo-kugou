<template>
  <div id="app">
      <k-head></k-head>
      <div class="main">
        <router-view keep-alive></router-view>
      </div>
  </div>
</template>

<script type="es6">
import kHead from './components/header/head'
export default {
  name: 'app',
  components: {
    kHead
  }
}
</script>

<style>

</style>
