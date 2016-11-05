<template>
  <div>
    <audio :src="audioUrl" controls class="audio-panel" autoplay loop></audio>
  </div>
</template>

<script type="es6">
  import { mapGetters } from 'vuex'
  export default {
    name:'player',
    computed:{
      ...mapGetters(['audioUrl'])
    }
  }
</script>
