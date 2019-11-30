<template>
  <div class="page-search">
    <div class="search-panel">
      <div class="search-input">
        <span class="search-icon"></span>
        <input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search" />
      </div>
      <a href="javascript:;" @click="search" class="search-btn">搜索</a>
    </div>

    <div class="search-list" v-show="togglePanel">
      <div class="search-list-title">最近热门</div>
      <mt-cell
        v-for="(item, index) in hotList"
        :title="item.keyword"
        @click.native="replaceInput(item.keyword)"
        :key="index">
      </mt-cell>
    </div>

    <div class="songs-list" v-show="!togglePanel">
      <div class="search-total">共有{{total}}条搜索结果</div>
      <mt-cell
        v-for="(item, index) in songList"
        :title="item.filename"
        @click.native="playAudio(index)"
        :key="index">
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
      keyword: '',
      hotList: [],
      togglePanel: true,
      total: null,
      songList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      this.$http.get('/mobliecdn_kugou/api/v3/search/hot?format=json&plat=0&count=30').then(({ data }) => {
        Indicator.close()
        this.hotList = data.data.info
      })
    },
    replaceInput (keyword) {
      this.keyword = keyword
      this.search()
    },
    search () {
      this.togglePanel = false
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      if (this.keyword) {
        this.$http.get(`/mobliecdn_kugou/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=30&showtype=1`).then(({ data }) => {
          this.songList = data.data.info
          this.total = data.data.total
          Indicator.close()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page-search {
    .search-panel {
      padding: 10px;
      background-color: #fbfbfb;
      height: 55px;
    }
    .search-input {
      width: 80%;
      height: 100%;
      display: block;
      border: 1px solid #e5e5e5;
      border-radius: 7px;
      float: left;
      background-color: #fff
    }
    .search-icon {
      display: block;
      float: left;
      width: 10%;
      height: 100%;
      background: url("http://m.kugou.com/v3/static/images/index/search_icon.png") no-repeat center;
      background-size: auto 100%
    }
    .search-input input {
      width: 90%;
      height: 100%;
      display: inline-block;
      padding: 0 10px 0 0;
      border: none;
      outline: none;
      background-color: transparent
    }
    .search-btn {
      display: block;
      height: 100%;
      width: 18%;
      background-color: #2ba2fa;
      float: right;
      border-radius: 7px;
      color: #fff;
      font-size: 15px;
      text-align: center;
      line-height: 35px;
      border: none;
      outline: none
    }
    .search-list-title {
      padding: 10px;
      color: deepskyblue
    }
    .search-total {
      padding: 5px 10px;
      background-color: #e1e1e1;
      color: #484848
    }
  }
</style>
