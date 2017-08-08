<template>
  <div v-show="detailPlayerFlag">
    <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
    <div class="detail_player"
         :style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)', '-webkit-filter':'blur(5px)'}"></div>
    <div class="detail_player-content">
      <div class="detail_player-title container">
        <span class="detail_player-back" @click="hideDetailPlayer()"></span>
        {{audio.title}}
      </div>
      <div class="detail_player-img">
        <img :src="audio.imgUrl">
      </div>
      <div class="detail_player-lrc">
        <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
          <p v-for="(item,index) in songLrc"
             :class="{isCurrentLrc:item.seconds >= audio.currentLength}">
            {{item.lrcContent}}</p>
        </div>
      </div>
      <div class="detail_player-range container">
        <span class="detail_player-time">{{audio.currentLength | time}}</span>
        <!--input事件会一直触发，所以禁用range，改为onclick-->
        <mt-range
          id="range"
          :min="0"
          :max="audio.songLength"
          v-model="audio.currentLength"
          :bar-height="3"
          @click.native="rangeChange($event)" disabled style="width: 80%"></mt-range>
        <span class="detail_player-time">{{audio.songLength | time}}</span>
      </div>
      <div class="detail_player-control player-padding">
        <i class="detail_player-btn play-prev player_btn-sm" @click="prev()"></i>
        <i class="detail_player-btn play-play player_btn-lg" :class="{'play-pause':isPlay}" @click="toggleStatus()"></i>
        <i class="detail_player-btn play-next player_btn-sm" @click="next()"></i>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {mapGetters} from 'vuex';
  export default {
    data(){
      return {
        rangeValue: 0
      }
    },
    filters: {
      time(value){
        var length = Math.floor(parseInt(value));
        var minute = Math.floor(value / 60);
        if (minute < 10) {
          minute = '0' + minute;
        }
        var second = length % 60;
        if (second < 10) {
          second = '0' + second;
        }
        return minute + ':' + second;
      }
    },
    computed: {
      ...mapGetters(['audio', 'detailPlayerFlag', 'isPlay']),
      songLrc(){
        if (this.audio.lrc) {
          var temp = this.audio.lrc.split('\r\n')
          temp = temp.splice(0, temp.length - 1)
          temp = temp.map((value)=> {
            var time = value.substr(1, 5)
            var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
            var lrcContent = value.substr(10)
            return {
              seconds,
              lrcContent
            }
          })
          return temp;
        }
      },
      lrcOffset(){
        if (this.songLrc) {
          var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-20)
          return this.audio.currentLength + offset - this.audio.currentLength
        }
      }
    },
    methods: {
      hideDetailPlayer(){
        this.$store.commit("showDetailPlayer", false)
      },
      rangeChange(event){
        var offset = event.offsetX
        var rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20
        var clickLength = Math.floor(offset * this.audio.songLength / rangeWidth)
        if (offset < rangeWidth) {
          this.$store.commit('setAudioTime', clickLength)
          this.$store.commit('setCurrent', true)
        }
      },
      toggleStatus(){
        if (this.isPlay) {
          document.getElementById('audioPlay').pause()
        } else {
          document.getElementById('audioPlay').play()
        }
        this.$store.commit('isPlay', !this.isPlay)
      },
      prev(){
        this.$store.dispatch('prev')
      },
      next(){
        this.$store.dispatch('next')
      }
    }
  }
</script>
