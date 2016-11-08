/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    audioUrl:'',
    audioFlag:false,
    headInfo:false,
    headTitle:'',
    headRouter:''
  },
  getters:{
    audioUrl(state){
      return state.audioUrl
    },
    audioFlag(state){
      return state.audioFlag
    },
    headInfo(state){
      return state.headInfo
    },
    headTitle(state){
      return state.headTitle
    },
    headRouter(state){
      return state.headRouter
    }
  },
  mutations:{
    setUrl(state,url){
      state.audioUrl=url;
    },
    showPlayer(state){
      state.audioFlag=true;
    },
    hidePlay(state){
      state.audioFlag=false;
    },
    showHead(state){
      state.headInfo=true;
    },
    setHeadTitle(state,title){
      state.headTitle=title;
    },
    hideHead(state){
      state.headInfo=false;
      state.headTitle=''
    },
    setHeadRouter(state,router){
      state.headRouter=router;
    }
  }
})

export default store
