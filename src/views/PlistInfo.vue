<template>
	<div class="rank-info-content plist-info">
		<div class="rank-banner-wrap"
		     :style="{backgroundImage: `url(${imgurl})`}">
		</div>
		
		<div class="plist-desp container">
			<p class="plist-desp-p" :class="{'plist-desp-hide': hideDesp }">{{desp}}</p>
			<img src="../assets/images/close_icon.png" alt="" @click="toggleDesp" class="plist-desp-icon" v-if="hideDesp">
			<img src="../assets/images/open_icon.png" alt="" @click="toggleDesp" class="plist-desp-icon" v-else>
		</div>
		<div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>
		
		<div class="rank-info-list">
			<mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
				<img src="../assets/images/download_icon.png" width="20" height="20">
			</mt-cell>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	import { PLAY_AUDIO } from '../mixins'
	export default {
		mixins: [PLAY_AUDIO],
		data(){
			return {
				imgurl: '',
				title: '',
				songList: [],
				updateTime: '',
				desp: '',
				hideDesp: true,
				opacity: 0,
			}
		},
		//通过路由的before钩子解除router-view缓存限制
		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.$store.commit('showHead', true)
				vm.getList()
				window.onscroll = () => {
					vm.opacity = window.pageYOffset / 250
					vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
				}
			});
		},
		beforeRouteLeave(to, from, next){
			this.$store.commit('showHead', false)
			window.onscroll = null
			next()
		},
		methods: {
			getList(){
				Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				var infoID = this.$route.params.id
				this.$http.get(`/proxy/plist/list/${infoID}?json=true`).then(({data}) => {
					Indicator.close()
					const info = data.info.list
					const list = data.list.list.info
					this.songList = list
					this.imgurl = info.imgurl.replace('{size}', '400')
					this.desp = info.intro
					this.$store.commit('setHeadTitle', info.specialname)
				});
			},
			toggleDesp(){
				this.hideDesp = !this.hideDesp
			},
		}
	}
</script>

<style scoped>
	.rank-banner-wrap {
		height: 250px;
		background-size: 100%
	}
</style>

