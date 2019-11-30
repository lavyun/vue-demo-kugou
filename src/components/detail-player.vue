<template>
  <div class="comp-detail-player" v-show="detailPlayerFlag">
    <div
      class="detail-player"
      :style="{backgroundImage:`url(${audio.imgUrl})`}">
    </div>
    <div class="detail-player-content">
      <div class="detail-player-title container">
        <span class="detail-player-back" @click="hideDetailPlayer()"></span>
        {{audio.title}}
      </div>
      <div class="detail-player-img">
        <img :src="audio.imgUrl" />
      </div>
      <div class="detail-player-lrc">
        <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
          <p
            v-for="(item, index) in songLrc"
            :key="index"
            :class="{'wait-lrc': item.seconds >= audio.currentLength}">
            {{item.lrcContent}}
          </p>
        </div>
      </div>
      <div class="detail-player-range container">
        <span class="detail-player-time">{{audio.currentLength | time}}</span>
        <!--input事件会一直触发，所以禁用range，改为onclick-->
        <mt-range
          id="range"
          v-model="audio.currentLength"
          :min="0"
          :max="audio.songLength"
          :bar-height="3"
          disabled
          style="width: 80%"
          @click.native="rangeChange($event)">
        </mt-range>
        <span class="detail-player-time">{{audio.songLength | time}}</span>
      </div>
      <div class="detail-player-control player-padding">
        <i class="detail-player-btn play-prev player_btn-sm" @click="prev()"></i>
        <i
          class="detail-player-btn play-play player_btn-lg"
          :class="{'play-pause': isPlay}"
          @click="toggleStatus()">
        </i>
        <i class="detail-player-btn play-next player_btn-sm" @click="next()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      rangeValue: 0
    }
  },
  filters: {
    time (value) {
      let length = Math.floor(parseInt(value))
      let minute = Math.floor(value / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      let second = length % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
  },
  computed: {
    ...mapGetters(['audio', 'detailPlayerFlag', 'isPlay']),
    songLrc () {
      if (this.audio.lrc) {
        const lrcSentenceRE = /^\[(\d{1,3}):(\d{2}\.\d{2})\](.*)/
        const lrcItems = this.audio.lrc.split('\r\n')
          .filter(item => {
            // 过滤出像 “[00:00.33]马英超 - 山水之间” 这类带时间的句子
            return lrcSentenceRE.test(item)
          })
          .map(item => {
            const matched = item.match(lrcSentenceRE)
            const minute = Number(matched[1])
            const second = Number(matched[2])
            return {
              seconds: minute * 60 + second,
              lrcContent: matched[3]
            }
          })

        return lrcItems
      }
    },
    lrcOffset () {
      if (this.songLrc) {
        const offset = (this.songLrc.length - document.querySelectorAll('.wait-lrc').length - 2) * (-20)
        return this.audio.currentLength + offset - this.audio.currentLength
      }
    }
  },
  methods: {
    hideDetailPlayer () {
      this.$store.commit('showDetailPlayer', false)
    },
    rangeChange (event) {
      const offset = event.offsetX
      const rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20
      const clickLength = Math.floor(offset * this.audio.songLength / rangeWidth)
      if (offset < rangeWidth) {
        this.$store.commit('setAudioTime', clickLength)
        this.$store.commit('setCurrent', true)
      }
    },
    toggleStatus () {
      if (this.isPlay) {
        document.getElementById('audioPlay').pause()
      } else {
        document.getElementById('audioPlay').play()
      }
      this.$store.commit('isPlay', !this.isPlay)
    },
    prev () {
      this.$store.dispatch('prev')
    },
    next () {
      this.$store.dispatch('next')
    }
  }
}
</script>

<style lang="less">
  .comp-detail-player {
    .detail-player {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1010;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(5px);
    }
    .detail-player-content {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
      z-index: 1010
    }
    .detail-player-title {
      width: 100%;
      height: 43px;
      background: -webkit-linear-gradient(top, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 43px;
      margin-top: 51px;
      position: relative
    }
    .detail-player-back {
      display: block;
      float: left;
      width: 24px;
      height: 100%;
      background: url("~@/assets/images/goback_icon.png") no-repeat center;
      background-size: 60% 60%;
      position: absolute;
      left: 5px;
      top: 0
    }
    .detail-player-img {
      width: 50%;
      margin: 30px auto
    }
    .detail-player-img img {
      width: 100%;
    }
    .mt-range-thumb {
      width: 16px;
      height: 16px;
      top: 7px
    }
    .detail-player-time {
      display: block;
      width: 10%;
      height: 30px;
      float: left;
      line-height: 30px;
      color: #fff;
      font-size: 12px;
      text-align: center
    }
    .detail-player-time:nth-of-type(2) {
      float: right;
      margin-top: -30px;
    }
    .mt-range {
      width: 80%;
      padding: 0 10px;
      overflow: hidden
    }
    .mt-range--disabled {
      opacity: 1
    }
    .mt-range-content {
      margin-right: 7px;
      width: 100%;
    }
    .player-padding {
      padding: 0 20%
    }
    .detail-player-control {
      margin-top: 10px;
    }
    .detail-player-btn {
      display: block;
      width: 33.3%;
      float: left;
      height: 100px;

      @media screen and (max-width: 320px) {
        & {
          display: block;
          width: 33.3%;
          float: left;
          height: 60px;
        }
      }
    }
    .play-prev {
      background: url("~@/assets/images/play_prev.png") no-repeat;
      background-size: 60% auto;
      background-position: center
    }
    .play-play {
      background: url("~@/assets/images/play_play.png") no-repeat;
      background-size: 80% auto;
      background-position: center
    }
    .play-pause {
      background: url("~@/assets/images/play_pause.png") no-repeat;
      background-size: 80% auto;
      background-position: center
    }
    .play-next {
      background: url("~@/assets/images/play_next.png") no-repeat;
      background-size: 60% auto;
      background-position: center
    }
    .detail-player-lrc {
      width: 100%;
      height: 60px;
      overflow: hidden;
      margin-bottom: 20px;
      text-align: center;
      color: #fff;
      line-height: 20px;
    }
    .lrc-content {
      transition: all .5s;
      transform: translateZ(0)
    }
  }
</style>
