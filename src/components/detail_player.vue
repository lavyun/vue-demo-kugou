<template>
  <div v-show="detailPlayerFlag">
    <div class="detail_player" :style="{'background-image':'url('+audio.imgUrl+')'}"></div>
    <div class="detail_player" :style="{'background-image':'url('+audio.imgUrl+')','filter':'blur(5px)','-webkit-filter':'blur(5px)'}"></div>
    <div class="detail_player-content">
      <div class="detail_player-title container">
        <span class="detail_player-back" @click="hideDetailPlayer()"></span>
        {{audio.title}}
      </div>
      <div class="detail_player-img">
        <img :src="imgUrl">
      </div>
      <div class="detail_player-lrc">
        {{songLrc}}
      </div>
      <div class="detail_player-range container">
        <span class="detail_player-time">{{audio.currentLength | time}}</span>
        <!--input事件会一直触发，所以禁用range，改为onclick-->
        <mt-range
          id="range"
          :min="0"
          :max="audio.songLength"
          v-model="audio.currentLength"
          :bar-height="3"
          @click.native="rangeChange($event)" disabled style="width: 80%"></mt-range>
        <span class="detail_player-time">{{audio.songLength | time}}</span>
      </div>
      <div class="detail_player-control player-padding">
        <i class="detail_player-btn play-prev player_btn-sm"></i>
        <i class="detail_player-btn play-play player_btn-lg" :class="{'play-pause':isPlay}" @click="toggleStatus()"></i>
        <i class="detail_player-btn play-next player_btn-sm"></i>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {mapGetters} from 'vuex';
  import {Range} from 'mint-ui'
  export default {
    data(){
      return {
        rangeValue:0
      }
    },
    filters:{
      time(value){
        var length=Math.floor(parseInt(value));
        var minute=Math.floor(value/60);
        if(minute<10){
          minute='0'+minute;
        }
        var second =length%60;
        if(second<10){
          second='0'+second;
        }
        return minute+':'+second;
      }
    },
    computed: {
      ...mapGetters(['audio', 'detailPlayerFlag','isPlay']),
      imgUrl(){
        var temp = this.audio.imgUrl.split('/100');
        return temp[0] + '/240' + temp[1]
      },
      songLrc(){
        var temp=this.audio.lrc.split('\r\n');
        console.log(temp)
      }
    },
    methods: {
      hideDetailPlayer(){
        this.$store.commit("showDetailPlayer",false);
      },
      rangeChange(event){
        var offset=event.offsetX;
        var rangeWidth=(document.documentElement.clientWidth-20)*0.8-20;
        var clickLength=Math.floor(offset*this.audio.songLength/rangeWidth);
        if(offset<rangeWidth){
          this.$store.commit('setAudioTime',clickLength);
          this.$store.commit('setCurrent',true);
        }
      },
      toggleStatus(){
        if(this.isPlay){
          document.getElementById('audioPlay').pause();
        }else{
          document.getElementById('audioPlay').play();
        }
        this.$store.commit('isPlay',!this.isPlay);
      }
    }
  }
</script>
