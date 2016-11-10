<template>
  <div class="container ringtone">
    <mt-cell v-for="(item,index) in songList" :title="item.title" :label="item.desp" @click.native="playAudio(index)">
      <a :href="item.orderUrl" class="order-img">
        <img src="../../static/order-ring.png" alt="">
        <p>订阅</p>
      </a>
    </mt-cell>
  </div>
</template>

<script type="es6">
  import {Cell,Indicator} from 'mint-ui'
  export default {
    data(){
      return {
        songList:[]
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://m.kugou.com/crbt/index&url2=').then(res=>{
          Indicator.close()
          this.parseList(res.data);
        })
      },
      parseList(data){
        var div=document.createElement('div');
        div.innerHTML=data;
        var list=div.querySelectorAll('.panel-songslist-item');
        for(var i=0;i<list.length;i++){
          var obj={};
          obj.title=list[i].querySelector('.rings-name').innerText;
          obj.desp=list[i].querySelector('.rings-sub').innerText.split("|").join(" | ");
          obj.songUrl=list[i].querySelector('.ring-btn-play').getAttribute('data-songurl');
          obj.orderUrl=list[i].querySelector('.order-ring').href;
          this.songList.push(obj);
        }
      },
      playAudio(index){
        this.$store.commit("toggleAudioLoadding");
        var songUrl=this.songList[index].songUrl;
        var imgUrl='http://m.kugou.com/v3/static/images/index/logo_kugou.png';
        var title=this.songList[index].title;
        var singer=this.songList[index].desp.split('|')[0];
        var audio={songUrl,imgUrl,title,singer}
        this.$store.commit("toggleAudioLoadding");
        this.$store.commit('setAudio',audio);
      }
    }
  }
</script>

