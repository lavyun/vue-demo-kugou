<template>
  <div class="page-rank-info">
    <div class="banner-wrap" :style="{backgroundImage:'url('+ imgurl + ')'}">
      <div class="rank-status container">
        <p>上次更新时间：{{getToday()}}</p>
      </div>
    </div>

    <div class="rank-info-list">
      <mt-cell
        v-for="(item, index) in songList"
        :title="item.filename"
        @click.native="playAudio(index)"
        :key="index">
        <span :class="getRankItemClass(index)">{{index + 1}}</span>
        <img src="../assets/images/download_icon.png" width="20" height="20" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { PLAY_AUDIO } from '../mixins'
export default {
  mixins: [PLAY_AUDIO],
  data () {
    return {
      imgurl: '',
      songList: [],
      updateTime: '',
      opacity: 0
    }
  },
  methods: {
    getRankItemClass (index) {
      return {
        'rank-index': true,
        'rank-list-good': index < 3,
        'rank-list-first': index === 0,
        'rank-list-second': index === 1,
        'rank-list-third': index === 2
      }
    },
    getToday () {
      const time = new Date()
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      if (month < 10) month = '0' + month
      if (date < 10) date = '0' + date
      return `${year}-${month}-${date}`
    },
    getList () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      const infoID = this.$route.params.id
      this.$http.get(`/m_kugou/rank/info/?rankid=${infoID}&page=1&json=true`).then(({ data }) => {
        Indicator.close()
        const { info, songs } = data
        const { banner7url, rankname } = info
        const { list } = songs
        this.imgurl = banner7url.replace('{size}', '400')
        this.songList = list
        this.$store.commit('setHeadTitle', rankname)
      })
    }
  },
  // 通过路由的before钩子解除keep-alive缓存限制
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('showHead', true)
      vm.getList()
      window.onscroll = () => {
        vm.opacity = window.pageYOffset / 250
        vm.$store.commit('setHeadStyle', { background: `rgba(43,162,251,${vm.opacity})` })
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('showHead', false)
    window.onscroll = null
    next()
  },
  mounted () {
    window.onscroll = () => {
      this.opacity = window.pageYOffset / 200
      this.$store.commit('setHeadStyle', { background: `rgba(43,162,251,${this.opacity})` })
    }
  }
}
</script>

<style lang="less">
  .page-rank-info {
    .banner-wrap {
      width: 100%;
      height: 200px;
      margin-top: -43px;
      position: relative;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%
    }

    .rank-status {
      height: 43px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
      line-height: 43px;
      font-size: 15px;
      color: #fff
    }

    .rank-info-list {
      .rank-index {
        position: absolute;
        left: 20px;
        font-size: 12px;
        margin-top: 4px
      }

      .mint-cell-title {
        padding-left: 35px;
      }
      .rank-list-first {
        background-color: #e80000;
      }

      .rank-list-second {
        background-color: #ff7200;
      }

      .rank-list-third {
        background-color: #f8b300;
      }
    }
  }

  .rank-list-good {
    display: inline-block;
    padding: 2px 8px;
    left: 12px !important;
    border-radius: 8px;
    color: #fff;
    margin-top: 3px !important;
  }
</style>
