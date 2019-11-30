<template>
  <div class="comp-control-player" :class="{'audio-panel-hide': toggleHide}">
    <audio :src="audio.songUrl" autoplay id="audioPlay" @timeupdate="change()" @ended="next()" @error="next()"></audio>
    <div class="audio-panel-control" @click="togglePanel" :class="{'toggle-control': toggleHide}">
      <mt-spinner type="snake" :size="27" v-show="audioLoading"></mt-spinner>
    </div>
    <div class="audio-panel">
      <img alt="" class="player-img" :src="audio.imgUrl" @click="showDetailPlayer()">
      <div class="player-status" @click="showDetailPlayer()">
        <p class="player-title ellipsis">{{audio.title}}</p>
        <p class="player-singer ellipsis">{{audio.singer}}</p>
      </div>
      <div class="player-controls">
        <span class="player-play" @click="toggleStatus()" :class="{'player-pause': isPlay}"></span>
        <span class="player-next" @click="next()"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'control-player',
  data () {
    return {
      toggleHide: false
    }
  },
  computed: {
    ...mapGetters(['audio', 'audioLoading', 'showPlayer', 'isPlay'])
  },
  methods: {
    togglePanel () {
      this.toggleHide = !this.toggleHide
    },
    toggleStatus () {
      if (this.isPlay) {
        document.getElementById('audioPlay').pause()
      } else {
        document.getElementById('audioPlay').play()
      }
      this.$store.commit('isPlay', !this.isPlay)
    },
    showDetailPlayer () {
      if (this.showPlayer) {
        this.$store.commit('showDetailPlayer', true)
      }
    },
    change () {
      const time = document.getElementById('audioPlay').currentTime
      if (this.audio.currentFlag) {
        document.getElementById('audioPlay').currentTime = this.audio.currentLength
        this.$store.commit('setCurrent', false)
      } else {
        this.$store.commit('setAudioTime', time)
      }
    },
    next () {
      this.$store.dispatch('next')
    }
  }
}
</script>

<style lang="less">
  .comp-control-player {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    transition: all .5s;

    &.audio-panel-hide {
      bottom: -64px
    }

    .audio-panel-control {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: rgba(0, 0, 0, .8) url("~@/assets/images/close_icon.png") no-repeat center;
      background-size: 25px;
      margin-left: 10px;
      margin-bottom: 10px;
      overflow: hidden;

      &.toggle-control {
        background: rgba(0, 0, 0, .8) url("~@/assets/images/open_icon.png") no-repeat center;
        background-size: 25px !important;
      }
    }
    .audio-panel {
      z-index: 999;
      width: 100%;
      height: 64px;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 7px;
    }
    .player-img {
      height: 100%;
      float: left;
      border-radius: 2px
    }
    .player-status {
      float: left;
      width: 50%;
      height: 100%;
      margin-left: 3%;
      padding: 5px 0;
      color: #fff;
    }
    .player-title {
      width: 100%;
      font-size: 16px;
      overflow: hidden;
      display: block;
    }
    .player-singer {
      display: block;
      height: 50%;
      width: 100%;
      color: #c4c4c4;
      padding-top: 2px
    }
    .player-controls {
      width: 30%;
      float: right;
      height: 100%
    }
    .player-controls span {
      display: block;
      width: 50%;
      height: 100%;
      float: left;
    }
    .player-play {
      background: url("~@/assets/images/play_icon.png") no-repeat center;
      background-size: auto 70%;
    }
    .player-pause {
      background: url("~@/assets/images/pause_icon.png") no-repeat center;
      background-size: auto 70%;
    }
    .player-next {
      background: url("~@/assets/images/next_icon.png") no-repeat center;
      background-size: auto 70%;
    }
    .mint-spinner-snake {
      background-color: #000;
      margin: 4px
    }
  }
</style>
