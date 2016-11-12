<template>
  <div class="container plist">
    <mt-cell v-for="(item,index) in plist" :title="item.title" is-link :label="item.countPlay" :to="item.location">
      <img slot="icon" :src="item.imgUrl" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script type="es6">
  import { Cell,Indicator } from 'mint-ui'
  export default {
    data(){
      return {
        plist:[]
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.get('http://cs003.m2828.com/demo/searchIT/proxy.php?val=&url1=http://m.kugou.com/plist/index&url2=').then((res)=>{
          Indicator.close();
          this.parseList(res.data)
        })
      },
      parseList(data){
        var div=document.createElement('div');
        div.innerHTML=data;
        var list=div.querySelectorAll('.panel-img-list li');
        for(var i=0;i<list.length;i++){
          var obj={};
          obj.imgUrl=list[i].querySelector('.panel-img-left img').getAttribute("_src");
          obj.title=list[i].querySelector('.panel-img-content-first').innerText;
          obj.countPlay=list[i].querySelector('.panel-img-content-sub').innerText;
          obj.location='/plist/info/'+list[i].querySelector('a').href.substr(30);
          this.plist.push(obj)
        }
      }
    }
  }
</script>

<style scoped>
  .mint-cell{padding: 10px 0 !important;}
  .mint-cell-title img{margin-right: 5px !important;}
</style>
