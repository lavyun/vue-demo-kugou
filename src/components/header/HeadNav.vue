<template>
  <div class="header-nav">
    <mt-navbar v-model="headNav" class="container">
      <mt-tab-item id="head-nav1">新歌</mt-tab-item>
      <mt-tab-item id="head-nav2">排行</mt-tab-item>
      <mt-tab-item id="head-nav3">歌单</mt-tab-item>
      <mt-tab-item id="head-nav4">歌手</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script type="es6">
  export default {
    name: 'head-nav',
    computed: {
    	headNav: {
    		get(){
    			return this.$store.getters.headNav
		    },
		    set(nav) {
    			const index = nav.substr(-1)
					this.$store.commit('setHeadNav', nav)
			    this.goRouter(Number(index))
		    }
	    }
    },
    methods: {
      goRouter(index){
        switch (index) {
          case 1:
            this.$router.push({path: '/'});
            break;
          case 2:
            this.$router.push({path: '/rank'});
            break;
          case 3:
            this.$router.push({path: '/plist'});
            break;
          case 4:
            this.$router.push({path: '/singer'});
            break;
        }
      }
    }
  }
</script>

<style>
  .mint-tab-item {
    padding: 12px 0 !important;
  }

  .mint-tab-item-label {
    font-size: 16px !important;
  }
</style>
