<template>
	<div class="rank">
		<mt-cell v-for="(item,index) in songList" :title="item.rankname" :to="`/rank/info/${item.rankid}`" is-link :key="index">
			<img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
		</mt-cell>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	export default {
		data(){
			return {
				songList: []
			}
		},
		created(){
			this.getList()
		},
		methods: {
			getList(){
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				this.$http.get('/proxy/rank/list&json=true').then(({data}) => {
					Indicator.close();
					this.songList = data.rank.list
				});
			}
		}
	}
</script>
<style lang="less">
	.rank{
		.mint-cell-title img {
			margin-right: 10px;
		}
		
		.mint-cell-wrapper{
			font-size: 16px;
		}
	}
</style>
