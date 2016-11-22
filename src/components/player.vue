<template>
  <div class="audio-view" :class="{'audio_panel_hide':toggleHide}">
    <audio :src="audio.songUrl"  autoplay loop id="audioPlay"></audio>
    <div class="audio-panel-control" @click="togglePanel" :class="{'toggleContral':toggleHide}">
      <mt-spinner type="snake" :size="27" v-show="audioLoadding"></mt-spinner>
    </div>
    <div class="audio-panel">
      <img alt="" class="player-img" :src="audio.imgUrl">
      <div class="player-status">
        <p class="player-title ellipsis">{{audio.title}}</p>
        <p class="player-singer ellipsis">{{audio.singer}}</p>
      </div>
      <div class="player-controls">
        <span class="player-Play" @click="toggleStatus" :class="{'player-Pause':toggleStatu}"></span>
        <span class="player-nextSong"></span>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import { mapGetters } from 'vuex'
  import { Spinner } from 'mint-ui'

  export default {
    name:'player',
    data(){
      return {
          toggleHide:false,
          toggleStatu:true,
      }
    },
    computed:{
      ...mapGetters(['audio','audioLoadding'])
    },
    methods:{
      togglePanel(){
        this.toggleHide=!this.toggleHide;
      },
      toggleStatus(){
        if(this.toggleStatu){
          document.getElementById('audioPlay').pause();
        }else{
          document.getElementById('audioPlay').play();
        }
        this.toggleStatu=!this.toggleStatu;
      }
    }
  }
</script>

