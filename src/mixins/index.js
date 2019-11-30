module.exports = {
  'PLAY_AUDIO': {
    methods: {
      playAudio (index) {
        const songInfo = this.songList[index]
        this.$store.commit('setListInfo', {
          list: this.songList,
          index: index
        })
        this.$store.dispatch('getSong', songInfo.hash)
        this.$store.dispatch('getLrc', {
          hash: songInfo.hash,
          timelength: songInfo.duration * 1000
        })
      }
    }
  }
}
