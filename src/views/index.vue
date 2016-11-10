<template>
  <div>
    <mt-swipe :auto="5000">
      <mt-swipe-item>
        <img src="../assets/banner1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/banner2.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/banner3.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/banner4.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <div>
      <mt-cell v-for="(item,index) in songList" :title="item.title" @click.native="playAudio(index)">
        <img src="../../static/download_icon.png" alt="" width="20" height="20">
      </mt-cell>
    </div>
  </div>


</template>

<script type="es6">
  import { Swipe, SwipeItem,Indicator,Cell } from 'mint-ui';
  export default{
    data(){
      return {
        songList:[]
      }
    },
    created(){
      this.get()
    },
    components:{},
    methods:{
      init(){

      },
      get(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://m.kugou.com&url2=').then((res) => {
          this.parseData(res.data);
        })
      },
      parseData(data){
        var div=document.createElement('div');
        div.innerHTML=data;
        var list=div.querySelectorAll('.panel-songslist-item');
        for(var i=0;i<list.length;i++){
          var song={};
          var title=list[i].querySelector('.panel-songs-item-name span').innerText;
          var hash=list[i].id.substr(6);
          song.title=title;song.hash=hash;
          this.songList.push(song)
        }
        Indicator.close();
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
<style>
  .mint-swipe{height: 39vw !important;}
  .mint-swipe-indicator{width: 12px !important;height: 12px !important;}
  .mint-swipe-indicators{bottom: 5px !important;}
</style>
