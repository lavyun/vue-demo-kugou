/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource)

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
    listenCount: 0,
    isPlay: true,
    listInfo: {
      songList: [],
      songIndex: 0
    }
  },
  getters: {
    audio: state=>state.audio,
    head: state=>state.head,
    audioLoadding: state=>state.audioLoadding,
    detailPlayerFlag: state=>state.detailPlayerFlag,
    showPlayer: state=>state.showPlayer,
    isPlay: state=>state.isPlay
  },
  mutations: {
    setAudio(state, audio){
      if (!state.listenCount) {
        state.showPlayer = true;  //首次进入应用时不可打开播放详情
      }
      state.listenCount++;
      state.audio = {...(state.audio), ...audio};
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
    toggleAudioLoadding: (state, flag)=> {
      state.audioLoadding = flag;
    },
    setHeadNav: (state, index)=> {
      state.headNav = 'head-nav' + index;
    },
    showDetailPlayer: (state, flag)=> {
      state.detailPlayerFlag = flag;
    },
    showPlayer: (state, flag)=> {
      state.showPlayer = flag;
    },
    isPlay: (state, flag)=> {
      state.isPlay = flag;
    },
    setLrc: (state, lrc)=> {
      state.audio = {...(state.audio), lrc}
    },
    setListInfo: (state, {list,index})=> {
      state.listInfo.songList = list;
      state.listInfo.songIndex = index;
    }
  },
  actions: {
    getSong({commit,state}, hash){
      commit('toggleAudioLoadding', true);
      Vue.http.get(`http://cs003.m2828.com/apis/getKugouSong.php?hash=${hash}`).then(res=> {
        var json_obj = JSON.parse(res.data);
        var songUrl = json_obj.url,
          imgUrl = json_obj.imgUrl.split('{size}').join('100'),
          title = json_obj.songName,
          singer = json_obj.choricSinger,
          songLength = json_obj.timeLength,
          currentLength = 0,
          audio = {songUrl, imgUrl, title, singer, songLength, currentLength};
        commit('setAudio', audio);
        commit('toggleAudioLoadding', false);
      });
    },
    getLrc({commit,state}, hash){
      Vue.http.get(`http://cs003.m2828.com/apis/getLrc.php?hash=${hash}`).then(res=> {
        commit('setLrc', res.data);
      })
    },
    prev({dispatch,state}){
      var list = state.listInfo.songList;
      if(state.listInfo.songIndex==0){
        state.listInfo.songIndex=list.length;
      } else {
        state.listInfo.songIndex--;
      }
      var hash = list[state.listInfo.songIndex].hash;
      dispatch('getSong', hash);
      dispatch('getLrc',hash);
    },
    next({dispatch,state}){
      var list = state.listInfo.songList;
      if (state.listInfo.songIndex == list.length - 1) {
        state.listInfo.songIndex = 0
      } else {
        ++state.listInfo.songIndex;
      }
      var hash = list[state.listInfo.songIndex].hash;
      dispatch('getSong', hash);
      dispatch('getLrc',hash);
    }
  }
});

export default store
