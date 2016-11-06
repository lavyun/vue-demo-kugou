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
    rankInfo:false,
    rankTitle:''
  },
  getters:{
    audioUrl(state){
      return state.audioUrl
    },
    audioFlag(state){
      return state.audioFlag
    },
    rankInfo(state){
      return state.rankInfo
    },
    rankTitle(state){
      return state.rankTitle
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
    showRank(state){
      state.rankInfo=true;
    },
    setRankTitle(state,title){
      state.rankTitle=title;
    },
    hideRank(state){
      state.rankInfo=false;
      state.rankTitle=''
    }
  }
})

export default store
