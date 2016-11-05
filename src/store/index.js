/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    audioUrl:'',
    audioFlag:false
  },
  getters:{
    audioUrl(state){
      return state.audioUrl
    },
    audioFlag(state){
      return state.audioFlag
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
    }
  }
})

export default store
