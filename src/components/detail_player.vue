<template>
  <div v-show="detailPlayerFlag">
    <div class="detail_player" :style="{'background-image':'url('+audio.imgUrl+')'}"></div>
    <div class="detail_player" :style="{'background-image':'url('+audio.imgUrl+')','filter':'blur(5px)','-webkit-filter':'blur(5px)'}"></div>
    <div class="detail_player-content">
      <div class="detail_player-title container">
        <a class="detail_player-back" @click="hideDetailPlayer()"></a>
        {{audio.title}}
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {mapGetters} from "vuex";
  export default {
    computed:{
      ...mapGetters(['audio','detailPlayerFlag'])
    },
    methods:{
      hideDetailPlayer(){
        this.$store.commit("hideDetailPlayer")
      }
    }
  }
</script>
