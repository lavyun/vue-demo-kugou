<template>
  <div class="page-singer-info">
    <div class="banner-wrap" :style="{backgroundImage: `url(${imgurl})`}">
    </div>

    <div class="plist-desp container">
      <p class="plist-desp-p" :class="{'plist-desp-hide': hideDesc }">{{desc}}</p>
      <img src="../assets/images/close_icon.png" @click="toggleDesc" class="plist-desp-icon" v-if="hideDesc">
      <img src="../assets/images/open_icon.png" @click="toggleDesc" class="plist-desp-icon" v-else>
    </div>
    <div style="height: 5px;background-color: #f1f1f1"></div>

    <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
      <img src="../assets/images/download_icon.png" width="20" height="20">
    </mt-cell>
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
      desc: '',
      hideDesc: true,
      opacity: 0
    }
  },
  // 通过路由的before钩子解除router-view缓存限制
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('showHead', true)
      vm.get()
      window.onscroll = () => {
        vm.opacity = window.pageYOffset / 250
        vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('showHead', false)
    window.onscroll = null
    next()
  },
  methods: {
    get () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      var infoID = this.$route.params.id
      this.$http.get(`/m_kugou/singer/info/${infoID}&json=true`).then(({data}) => {
        Indicator.close()
        const info = data.info
        const songList = data.songs.list
        this.imgurl = info.imgurl.replace('{size}', '400')
        this.desc = info.intro
        this.songList = songList
        this.$store.commit('setHeadTitle', info.singername)
      })
    },
    toggleDesc () {
      this.hideDesc = !this.hideDesc
    }
  }
}
</script>
<style lang="less">
  .page-singer-info {
    .banner-wrap {
      width: 100%;
      margin-top: -43px;
      position: relative;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      height: 250px;
    }

    .plist-desp {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      position: relative;
      text-align: justify;
      .plist-desp-p {
        padding-right: 40px;
        line-height: 135%
      }
      .plist-desp-icon {
        display: block;
        width: 24px;
        height: 24px;
        position: absolute;
        right: 10px;
        top: 10px
      }
      .plist-desp-hide {
        overflow: hidden;
        height: 1.35em;
      }
    }
  }
</style>
