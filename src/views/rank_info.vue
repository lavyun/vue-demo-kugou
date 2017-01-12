<template>
  <div class="rank-info-content">
    <!--<div class="rank-head container">-->
        <!--<router-link to="/rank" class="rank-head-back"></router-link>-->
        <!--{{title}}-->
    <!--</div>-->
    <div class="rank-banner-wrap" :style="{'background-image':'url('+imgSrc+')','background-size': '100%','background-repeat': 'no-repeat','background-position': 'center'}">
      <div class="rank-status container">
        <p>{{updateTime}}</p>
      </div>
    </div>

    <div class="rank-info-list">
      <mt-cell v-for="(item,index) in songList" :title="item.title" @click.native="playAudio(index)">
        <span class="rank-index" :class="{'rank-list-good' : index<3, 'rank-list-first' : index==0, 'rank-list-second' : index==1, 'rank-list-third' : index==2}">{{index+1}}</span>
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>

<script type="es6">
  import { Indicator } from 'mint-ui'
  import { PLAY_AUDIO } from '../mixins'
  export default {
    mixins:[PLAY_AUDIO],
    data(){
      return {
        imgSrc:'',
        title:'',
        songList:[],
        updateTime:'',
        opacity:0
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showHead',true)
        vm.getList();
        window.onscroll=()=>{
          vm.opacity=window.pageYOffset/250;
          vm.$store.commit('setHeadStyle',{background:`rgba(43,162,251,${vm.opacity})`});
        }
      })
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit('showHead',false);
      window.onscroll=null;
      next()
    },
    mounted(){
      window.onscroll=()=>{
        this.opacity=window.pageYOffset/200;
        this.$store.commit('setHeadStyle',{background:`rgba(43,162,251,${this.opacity})`});
      }
    },
    methods:{
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var infoID=this.$route.params.id;
        this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/rank/info/${infoID}`).then(res=>{
          Indicator.close();
          this.parseList(res.data);
        })
      },
      parseList(data){
        var div=document.createElement('div');
        div.innerHTML=data;
        this.imgSrc=div.querySelector('#imgBoxInfo img').src;
        this.title=div.querySelector('.page-title').innerText;
        this.updateTime=div.querySelector('.rank-info-time span').innerText;
        this.$store.commit('setHeadTitle',this.title);
        var list=div.querySelectorAll('.panel-songslist-item');
        this.songList = [];
        for(var i=0;i<list.length;i++){
          var song={};
          song.title=list[i].querySelector('.panel-songs-item-name span').innerText;
          song.hash=list[i].id.substr(6);
          this.songList.push(song);
        }
      }
    }
  }
</script>

<style>
  .rank-list-good{display: inline-block;padding: 2px 8px;left: 12px !important;border-radius: 8px;color: #fff;margin-top: 3px !important;}
  .rank-list-first{background-color: #E80000;}
  .rank-list-second{background-color: #FF7200;}
  .rank-list-third{background-color: #F8B300;}
</style>

