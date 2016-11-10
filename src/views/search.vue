<template>
  <div>
      <div class="search-panel">
        <div class="search-input">
          <span class="search-icon"></span>
          <input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search">
        </div>
        <button href="javascript:;" @click="search" class="search-btn">搜索</button>
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
            <img src="../../static/download_icon.png" alt="" width="20" height="20">
          </mt-cell>
      </div>
  </div>
</template>

<script type="es6">
  import { Indicator } from 'mint-ui'
  export default {
    data(){
      return {
        keyword:'',
        hotList:[],
        togglePanel:true,
        songList:[],
        total:null
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/hot?plat=0&count=30&url2=').then((res)=>{
          var list=JSON.parse(res.data).data.info;
          this.hotList= [...list.map(({keyword})=>keyword)];
          Indicator.close();
        })
      },
      replaceInput(index){
        this.keyword=this.hotList[index];
        this.search()
      },
      search(){
        this.togglePanel=false;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/song?keyword='+this.keyword+'&page=1&pagesize=30&url2=').then((res)=>{
          var list=JSON.parse(res.data).data.info;
          this.total=JSON.parse(res.data).data.total
          this.songList= [...list.map(
            ({filename,hash})=>({filename,hash})
          )];
          Indicator.close();
        })
      },
      playAudio(index){
        this.$store.commit("toggleAudioLoadding");
        this.$http.get('http://cs003.m2828.com/phps/getKugouSong.php?hash='+this.songList[index].hash).then((res)=>{
          var songUrl=JSON.parse(res.data).url;
          var imgUrl=JSON.parse(res.data).imgUrl.split('{size}').join('100');
          var title=JSON.parse(res.data).songName;
          var singer=JSON.parse(res.data).choricSinger;
          var audio={songUrl,imgUrl,title,singer}
          this.$store.commit("toggleAudioLoadding");
          this.$store.commit('setAudio',audio);
        })
      }
    }
  }
</script>
