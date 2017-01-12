<template>
  <div class="rank-info-content plist-info">
    <div class="rank-banner-wrap"
         :style="{'background-image':'url('+imgSrc+')','background-size': '100%','background-repeat': 'no-repeat','background-position': 'top center'}">
    </div>

    <div class="plist-desp container">
      <p class="plist-desp-p" :class="{'plist-desp-hide': hideDesp }">{{desp}}</p>
      <img src="../assets/images/close_icon.png" @click="toggleDesp" class="plist-desp-icon" v-if="hideDesp">
      <img src="../assets/images/open_icon.png" @click="toggleDesp" class="plist-desp-icon" v-else>
    </div>
    <div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>

    <div class="rank-info-list">
      <mt-cell v-for="(item,index) in songList" :title="item.title" @click.native="playAudio(index)">
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>
<script type="es6">
  import { Indicator } from 'mint-ui'
  import { PLAY_AUDIO } from '../mixins'
  export default {
    mixins: [PLAY_AUDIO],
    data(){
      return {
        imgSrc: '',
        title: '',
        songList: [],
        updateTime: '',
        desp: '',
        hideDesp: true,
        opacity: 0
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showHead', true);
        vm.get();
        window.onscroll = ()=> {
          vm.opacity = window.pageYOffset / 250;
          vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`});
        }
      })
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showHead', false);
      window.onscroll = null;
      next();
    },
    methods: {
      get(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var infoID = this.$route.params.id;
        this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/singer/info/${infoID}`).then((res)=> {
          Indicator.close();
          this.parseList(res.data);
        });
      },
      parseList(data){
        var div = document.createElement('div');
        div.innerHTML = data;
        if (div.querySelector('#imgBoxInfo')) {
          this.imgSrc = div.querySelector('#imgBoxInfo img').src;
          this.title = div.querySelector('.page-title').innerText;
          this.desp = div.querySelector('#introBox p').innerText;
          this.songList = [];
          var list = div.querySelectorAll('.panel-songslist-item');
          for (let i = 0; i < list.length; i++) {
            var song = {};
            song.title = list[i].querySelector('.panel-songs-item-name span').innerText;
            song.hash = list[i].id.substr(6);
            this.songList.push(song)
          }
        } else {
          var imgSrc_A = div.querySelector('.sng_ins_1 .top img').getAttribute("_src").split('/120');
          this.imgSrc = imgSrc_A[0] + '/480' + imgSrc_A[1];
          this.title = div.querySelector('.sng_ins_1 .top .intro .clear_fix').innerText;
          this.desp = div.querySelector('#text .bordr_cen').innerText;
          this.songList = [];
          var list = div.querySelectorAll('#song_container li');
          for (let i = 0; i < list.length; i++) {
            var song = {};
            var song_info = list[i].querySelector('.song_hid').value.split("|");
            song.title = song_info[0];
            song.hash = song_info[1];
            this.songList.push(song);
          }
        }
        this.$store.commit('setHeadTitle', this.title);
      },
      toggleDesp(){
        this.hideDesp = !this.hideDesp;
      }
    }
  }
</script>
<style scoped>
  .rank-banner-wrap {
    height: 250px;
  }
</style>
