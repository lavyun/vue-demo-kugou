<template>
  <div class="page-rank">
    <mt-cell
      v-for="(item, index) in songList"
      :title="item.rankname"
      :to="`/rank/info/${item.rankid}`"
      is-link
      :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60" />
    </mt-cell>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      songList: []
    }
  },
  methods: {
    getList () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      this.$http.get('/m_kugou/rank/list&json=true').then(({ data }) => {
        Indicator.close()
        this.songList = data.rank.list
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang="less">
.page-rank {
  .mint-cell-title img {
    margin-right: 10px;
  }

  .mint-cell-wrapper {
    font-size: 16px;
    padding: 10px 5px;
  }
}
</style>
