<template>
	<div class="plist">
		<mt-cell v-for="(item,index) in list" :title="item.specialname" is-link
		         :label="String(item.playcount)" :to="`/plist/info/${item.specialid}`" :key="index">
			<img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
		</mt-cell>
	</div>
</template>

<script type="es6">
	import { Indicator } from 'mint-ui'
	export default {
		data(){
			return {
				list: []
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
				this.$http.get('/proxy/plist/index&json=true').then(({data}) => {
					Indicator.close()
					this.list = data.plist.list.info
				})
			},
		}
	}
</script>

