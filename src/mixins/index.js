module.exports = {
  'PLAY_AUDIO':{
    methods:{
      playAudio(index){
        var hash = this.songList[index].hash;
        var info = {
          list: this.songList,
          index: index
        };
        this.$store.commit('setListInfo', info);
        this.$store.dispatch('getSong', hash);
        this.$store.dispatch('getLrc', hash);
      }
    }
  },
  'INIT':{
    data(){
      return {
        songList:[]
      }
    },
    created(){
      this.getList();
    }
  }
};
