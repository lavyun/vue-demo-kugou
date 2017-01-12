<template>
  <div>
    <div class="search-panel">
      <div class="search-input">
        <span class="search-icon"></span>
        <input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search">
      </div>
      <a href="javascript:;" @click="search" class="search-btn">搜索</a>
    </div>

    <div class="search-list" v-show="togglePanel">
      <div class="search-list-title">最近热门</div>
      <mt-cell v-for="(item,index) in hotList" :title="item" @click.native="replaceInput(index)"></mt-cell>
    </div>

    <div class="songs-list" v-show="!togglePanel">
      <div class="search-total">
        共有{{total}}条搜索结果
      </div>
      <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)">
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>

<script type="es6">
  import { Indicator } from 'mint-ui'
  import { INIT, PLAY_AUDIO } from '../mixins'
  export default {
    mixins: [INIT, PLAY_AUDIO],
    data(){
      return {
        keyword: '',
        hotList: [],
        togglePanel: true,
        total: null
      }
    },
    methods: {
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('http://cs003.m2828.com/apis/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/hot?plat=0&count=30&url2=').then(res=> {
          var list = JSON.parse(res.data).data.info;
          this.hotList = [...list.map(({keyword})=>keyword)];
          Indicator.close();
        });
      },
      replaceInput(index){
        this.keyword = this.hotList[index];
        this.search();
      },
      search(){
        this.togglePanel = false;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.get('http://cs003.m2828.com/apis/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/song?keyword=' + this.keyword + '&page=1&pagesize=30&url2=').then(res=> {
          var list = JSON.parse(res.data).data.info;
          this.total = JSON.parse(res.data).data.total
          this.songList = [...list.map(
            ({filename,hash})=>({filename, hash})
          )];
          Indicator.close();
        });
      }
    }
  }
</script>
