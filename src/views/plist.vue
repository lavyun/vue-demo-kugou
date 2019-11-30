<template>
  <div class="page-plist">
    <mt-cell
      v-for="(item, index) in list"
      :title="item.specialname"
      is-link
      :label="String(item.playcount)"
      :to="`/plist/info/${item.specialid}`"
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
      list: []
    }
  },
  methods: {
    getList () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      this.$http.get('/m_kugou/plist/index&json=true').then(({ data }) => {
        Indicator.close()
        this.list = data.plist.list.info
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less">
  .page-plist {
    .mint-cell-text {
      position: absolute;
      left: 90px;
      top: 23px;
      padding-right: 40px;
      height: 16px;
      overflow: hidden;
      line-height: 16px;
    }
    .mint-cell-label {
      position: absolute;
      left: 90px;
      top: 38px
    }
    .mint-cell-label:before {
      content: '';
      display: inline-block;
      margin-right: 6px;
      width: 12px;
      height: 12px;
      background: url("~@/assets/images/icon_music.png") no-repeat center;
      background-size: 100%;
    }
    .mint-cell-wrapper {
      padding: 10px 5px;
    }
  }
</style>
