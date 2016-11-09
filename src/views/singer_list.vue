<template>
  <div>
    <mt-cell v-for="item in singerList" :to="item.location" is-link :title="item.name">
      <img slot="icon" :src="item.imgSrc" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script type="es6">
  import { Cell,Indicator } from 'mint-ui'
  export default{
    data(){
      return {
        singerList:[],
        title:''
      }
    },
    beforeRouteEnter(to,from,next){
      next(vm=>{
        vm.$store.commit('showHead');
        vm.$store.commit('setHeadStyle',{'background':'#2CA2F9'})
        vm.getList();
      })
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit('hideHead');
      this.$store.commit('resetHeadStyle')
      next();
    },
    methods:{
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        var singerID=this.$route.params.id;
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://m.kugou.com/singer/list/&url2='+singerID).then((res)=>{
          Indicator.close();
          this.parseList(res.data);
        })
      },
      parseList(data){
        var div=document.createElement('div');
        div.innerHTML=data;
        this.title=div.querySelector('.page-title').innerText;
        this.$store.commit('setHeadTitle',this.title);
        var list=div.querySelectorAll('#panelList li');
        this.singerList=[];
        for(var i=0;i<list.length;i++){
          var singer={};
          singer.imgSrc=list[i].querySelector('.panel-img-left img').getAttribute('_src');
          singer.name=list[i].querySelector('.panel-img-content-first').innerText;
          singer.location='/singer/info/'+list[i].querySelector('a').href.substr(31);
          this.singerList.push(singer);
        }
      }
    }
  }
</script>

<style scoped>
  .mint-cell{padding: 10px 0}
  .mint-cell-title img{margin-right: 10px}
</style>
