/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    audio: {
      songUrl: '',
      imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      title: '',
      singer: '',
      currentLength: 0,
      songLength: 0,
      currentFlag: false
    },
    head: {
      toggle: false,
      title: '',
      style: {'background': 'rgba(43,162,251,0)'}
    },
    headNav: 'head-nav1',
    audioLoadding: false,
    detailPlayerFlag: false,
    showPlayer: false,
    listenCount:0
  },
  getters: {
    audio: state=>state.audio,
    head: state=>state.head,
    audioLoadding: state=>state.audioLoadding,
    detailPlayerFlag: state=>state.detailPlayerFlag,
    showPlayer: state=>state.showPlayer
  },
  mutations: {
    setAudio(state, audio){
      if(!state.listenCount){
        state.showPlayer=true;  //首次进入应用时不可打开播放详情
      }
      state.listenCount++;
      state.audio = audio;
    },
    setAudioTime(state, time){
      state.audio.currentLength = time;
    },
    setCurrent(state, flag){
      state.audio.currentFlag = flag;
    },
    showHead(state, flag){
      state.head.toggle = flag;
    },
    setHeadTitle(state, title){
      state.head.title = title;
    },
    setHeadStyle(state, style){
      state.head.style = style;
    },
    resetHeadStyle: state=> {
      state.head.style = {'background': 'rgba(43,162,251,0)'};
    },
    toggleAudioLoadding: state=> {
      state.audioLoadding = !state.audioLoadding;
    },
    setHeadNav: (state, index)=> {
      state.headNav = 'head-nav' + index;
    },
    showDetailPlayer: (state,flag)=> {
      state.detailPlayerFlag = flag;
    },
    showPlayer: (state, flag)=> {
      state.showPlayer = flag;
    }
  }
});

export default store
