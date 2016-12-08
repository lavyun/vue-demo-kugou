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
      singer: ''
    },
    head: {
      toggle: false,
      title: '',
      style: {'background': 'rgba(43,162,251,0)'}
    },
    headNav: 'head-nav1',
    audioLoadding: false,
    detailPlayerFlag: false
  },
  getters: {
    audio: state=>state.audio,
    head: state=>state.head,
    audioLoadding: state=>state.audioLoadding,
    detailPlayerFlag: state=>state.detailPlayerFlag
  },
  mutations: {
    setAudio(state, audio){
      state.audio = audio;
    },
    showHead(state, title){
      state.head.toggle = true;
    },
    setHeadTitle(state, title){
      state.head.title = title;
    },
    hideHead(state){
      state.head.toggle = false;
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
    showDetailPlayer: state=> {
      state.detailPlayerFlag = true;
    },
    hideDetailPlayer: state=> {
      state.detailPlayerFlag = false;
    }
  }
});

export default store
