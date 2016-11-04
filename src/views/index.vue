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
      <mt-cell v-for="(item,index) in nameItems" :title="item" @click.native="playAudio">
        <img src="http://m.kugou.com/v3/static/images/index/download_icon_2.png" alt="" width="20" height="20">
      </mt-cell>
    </div>
  </div>


</template>

<script type="es6">
  import { Swipe, SwipeItem } from 'mint-ui';
  import { Cell } from 'mint-ui';

  export default{
    data(){
      return {
        nameItems:[],
        statusItems:[]
      }
    },
    created(){
      this.get()
    },
    components:{Swipe, SwipeItem},
    methods:{
      init(){

      },
      get(){
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://m.kugou.com&url2=').then((res) => {
          this.parseData(res.data)
        })
      },
      parseData(data){
        var div=document.createElement('div');
        div.innerHTML=data;
        var list=div.querySelectorAll('.panel-songslist-item');
        for(var i=0;i<list.length;i++){
          var title=list[i].querySelector('.panel-songs-item-name span').innerText;
          this.nameItems.push(title)
        }

        for(var j=0;j<list.length;j++){
          var song={};
          var songId=list[j].id.substr(6)
          song.id=songId;
          this.statusItems.push(song);
        }
        console.log(this.nameItems);
        console.log(this.statusItems)
      },
      playAudio(){
        this.$http.get('http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=740BFABFA510726FC2FCB8F0FAC6E34F').then((res)=>{
          console.log(res.data);
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
