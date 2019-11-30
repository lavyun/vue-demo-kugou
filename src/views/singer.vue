<template>
  <div class="page-singer">
    <div class="cell-group">
      <div class="cell-item" @click="goRouter(88)">热门歌手</div>
    </div>
    <div class="cell-group">
      <div class="cell-item" @click="goRouter(1)">华语男歌手</div>
      <div class="cell-item" @click="goRouter(2)">华语女歌手</div>
      <div class="cell-item" @click="goRouter(3)">华语组合</div>
    </div>
    <div class="cell-group">
      <div class="cell-item" @click="goRouter(4)">日韩男歌手</div>
      <div class="cell-item" @click="goRouter(5)">日韩女歌手</div>
      <div class="cell-item" @click="goRouter(6)">日韩组合</div>
    </div>
    <div class="cell-group">
      <div class="cell-item" @click="goRouter(7)">欧美男歌手</div>
      <div class="cell-item" @click="goRouter(8)">欧美女歌手</div>
      <div class="cell-item" @click="goRouter(9)">欧美组合</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goRouter (id) {
      this.$router.push({ path: `/singer/list/${id}` })
    }
  }
}
</script>

<style lang="less">
  .page-singer {
    padding: 6px 12px;
    .cell-group {
      margin: 15px 0;
      width: 100%;
      border: 1px solid #e4e4e4;
      border-radius: 5px;
      background-color: #fbfbfb
    }
    .cell-item {
      padding: 12px 15px;
      font-size: 15px;
      border-bottom: 1px solid #e4e4e4;
      position: relative
    }
    .cell-item:after {
      content: '';
      display: block;
      position: absolute;
      width: 12px;
      height: 100%;
      background: url("~@/assets/images/arrow_icon.png") no-repeat center;
      background-size: 12px;
      top: 0;
      right: 15px
    }
    .cell-item:last-of-type {
      border: none
    }
  }
</style>
