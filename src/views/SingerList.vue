<template>
  <div class="singer_list">
    <mt-cell v-for="item in list" :to="`/singer/info/${item.singerid}`" is-link :title="item.singername" :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  export default{
    data(){
      return {
        list: [],
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm=> {
        vm.$store.commit('showHead', true)
        vm.$store.commit('setHeadStyle', {'background': '#2CA2F9'})
        vm.getList();
      })
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showHead', false)
      this.$store.commit('resetHeadStyle')
      next()
    },
    methods: {
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var singerID = this.$route.params.id
        this.$http.get(`/proxy/singer/list/${singerID}?json=true`).then(({data})=> {
          Indicator.close()
	        this.list = data.singers.list.info
					this.$store.commit('setHeadTitle', data.classname)
				})
      }
    }
  }
</script>

<style>
	.singer_list .mint-cell-title img {
    margin-right: 10px
  }
</style>
