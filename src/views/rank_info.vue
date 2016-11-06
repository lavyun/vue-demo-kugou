<template>
  <div>
    <div class="rank-head container">
        <router-link to="/rank" class="rank-head-back">

        </router-link>
        {{title}}
    </div>
    <div class="rank-banner-wrap" :style="{'background':'url('+imgSrc+') no-repeat center'}">
      <div class="rank-status container">
        <p>上次更新时间:</p>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data(){
      return {
        imgSrc:'',
        title:''
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.get();
      })
    },
    methods:{
      get(){
        var infoID=this.$route.params.id;
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://m.kugou.com/rank/info/&url2='+infoID).then((res)=>{
          this.parseList(res.data)
        })
      },
      parseList(data){
        var div=document.createElement('div');
        div.innerHTML=data;
        this.imgSrc=div.querySelector('#imgBoxInfo img').src;
        this.title=div.querySelector('.page-title').innerText;
      }
    }
  }
</script>
