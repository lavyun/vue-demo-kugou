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
    headStyle:{'background':'-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))'}
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
    headStyle(state){
      return state.headStyle;
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
    setHeadStyle(state,style){
      state.headStyle=style;
    },
    resetHeadStyle:state=>{
      state.headStyle={'background':'-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))'};
    }
  }
})

export default store
