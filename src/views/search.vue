<template>
  <div>
      <div class="search-panel">
        <div class="search-input">
          <span class="search-icon"></span>
          <input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search">
        </div>
        <button href="javascript:;" @click="getList" class="search-btn">搜索</button>
      </div>

      <div class="search-list" v-show="togglePanel">
          <div class="search-list-title">最近热门</div>
          <mt-cell v-for="(item,index) in hotList" :title="item" @click.native="replaceInput(index)"></mt-cell>
      </div>

      <div class="songs-list" v-show="!togglePanel">

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
        togglePanel:false
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
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/song?keyword='+this.keyword+'&page=1&pagesize=30&url2=').then((res)=>{
          console.log(JSON.parse(res.data))
        })
      }
    }
  }
</script>
