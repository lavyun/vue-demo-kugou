<template>
  <div class="container ringtone">
    <mt-cell v-for="(item,index) in songList" :title="item.title" :label="item.desp" @click.native="playAudio(index)">
      <a :href="item.orderUrl" class="order-img">
        <img src="../assets/images/order-ring.png">
        <p>订阅</p>
      </a>
    </mt-cell>
  </div>
</template>

<script type="es6">
  import { Cell, Indicator } from 'mint-ui'
  import list_rings from '../jsons/list_rings'
  import { INIT } from '../mixins'
  export default {
    mixins: [INIT],
    beforeRouteEnter(to, from, next){
      next(vm=> {
        vm.$store.commit('showPlayer', false);
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showPlayer', true);
      next();
    },
    methods: {
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.parseList(list_rings);
      },
      parseList(data){
        setTimeout(()=> {
          Indicator.close();
          this.songList = data;
        }, 1000);
      },
      playAudio(index){
        this.$store.commit("toggleAudioLoadding", true);
        var songUrl = this.songList[index].songUrl,
          imgUrl = 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
          title = this.songList[index].title,
          singer = this.songList[index].desp.split('|')[0];
        var audio = {songUrl, imgUrl, title, singer};
        this.$store.commit("toggleAudioLoadding", false);
        this.$store.commit('setAudio', audio);
      }
    }
  }
</script>

