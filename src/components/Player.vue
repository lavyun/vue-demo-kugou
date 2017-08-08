<template>
  <div class="audio-view" :class="{'audio_panel_hide':toggleHide}">
    <audio :src="audio.songUrl" autoplay id="audioPlay" @timeupdate="change()" @ended="next()" @error="next()"></audio>
    <div class="audio-panel-control" @click="togglePanel" :class="{'toggleContral':toggleHide}">
      <mt-spinner type="snake" :size="27" v-show="audioLoadding"></mt-spinner>
    </div>
    <div class="audio-panel">
      <img alt="" class="player-img" :src="audio.imgUrl" @click="showDetailPlayer()">
      <div class="player-status" @click="showDetailPlayer()">
        <p class="player-title ellipsis">{{audio.title}}</p>
        <p class="player-singer ellipsis">{{audio.singer}}</p>
      </div>
      <div class="player-controls">
        <span class="player-Play" @click="toggleStatus()" :class="{'player-Pause':isPlay}"></span>
        <span class="player-nextSong" @click="next()"></span>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import { mapGetters } from 'vuex'

  export default {
    name: 'player',
    data(){
      return {
        toggleHide: false
      }
    },
    computed: {
      ...mapGetters(['audio', 'audioLoadding', 'showPlayer', 'isPlay'])
    },
    methods: {
      togglePanel(){
        this.toggleHide = !this.toggleHide;
      },
      toggleStatus(){
        if (this.isPlay) {
          document.getElementById('audioPlay').pause();
        } else {
          document.getElementById('audioPlay').play();
        }
        this.$store.commit('isPlay', !this.isPlay);
      },
      showDetailPlayer(){
        if (this.showPlayer) {
          this.$store.commit('showDetailPlayer', true);
        }
      },
      change(){
        var time = document.getElementById('audioPlay').currentTime
        if (this.audio.currentFlag) {
          document.getElementById('audioPlay').currentTime = this.audio.currentLength;
          this.$store.commit('setCurrent', false);
        } else {
          this.$store.commit('setAudioTime', time);
        }
      },
      next(){
        this.$store.dispatch('next');
      }
    }
  }
</script>

