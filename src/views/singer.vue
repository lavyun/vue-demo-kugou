<template>
  <div class="container">
      <div class="cell-group">
        <div class="cell-item" to="/singer/list/88" @click="goRouter($event)">热门歌手</div>
      </div>
      <div class="cell-group">
        <div class="cell-item" to="/singer/list/1" @click="goRouter($event)">华语男歌手</div>
        <div class="cell-item" to="/singer/list/2" @click="goRouter($event)">华语女歌手</div>
        <div class="cell-item" to="/singer/list/3" @click="goRouter($event)">华语组合</div>
      </div>
      <div class="cell-group">
        <div class="cell-item" to="/singer/list/4" @click="goRouter($event)">日韩男歌手</div>
        <div class="cell-item" to="/singer/list/5" @click="goRouter($event)">日韩女歌手</div>
        <div class="cell-item" to="/singer/list/6" @click="goRouter($event)">日韩组合</div>
      </div>
      <div class="cell-group">
        <div class="cell-item" to="/singer/list/7" @click="goRouter($event)">欧美男歌手</div>
        <div class="cell-item" to="/singer/list/8" @click="goRouter($event)">欧美女歌手</div>
        <div class="cell-item" to="/singer/list/9" @click="goRouter($event)">欧美组合</div>
      </div>
  </div>
</template>
<script>
  export default {
    methods:{
      goRouter(e){
        var route=e.target.attributes.to.value;
        this.$router.push(route);
      }
    }
  }
</script>
