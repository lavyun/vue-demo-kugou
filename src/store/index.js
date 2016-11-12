/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    audio:{
      songUrl:'',
      imgUrl:'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      title:'',
      singer:''
    },
    audioLoadding:false,
    head:{
      toggle:false,
      title:'',
      style:{'background':'-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))'}

    }
  },
  getters:{
    audio:state=>state.audio,
    head:state=>state.head,
    audioLoadding:state=>state.audioLoadding
  },
  mutations:{
    setAudio(state,audio){
      state.audio=audio;
    },
    showHead(state,title){
      state.head.toggle=true;
    },
    setHeadTitle(state,title){
      state.head.title=title;
    },
    hideHead(state){
      state.head.toggle=false;
    },
    setHeadStyle(state,style){
      state.head.style=style;
    },
    resetHeadStyle:state=>{
      state.head.style={'background':'-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))'};
    },
    toggleAudioLoadding:state=>{
      state.audioLoadding=!state.audioLoadding;
    }
  }
})

export default store
