import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
	routes: [{
		path: '/newSongs',
		component: require('../views/NewSongs'),
		alias: '/'
	}, {
		path: '/rank',
		component: require('../views/Rank')
	}, {
		path: '/plist',
		component: require('../views/Plist')
	}, {
		path: '/singer',
		component: require('../views/Singer')
	}, {
		path: '/search',
		component: require('../views/Search')
	}, {
		path: '/rank/info/:id',
		component: require('../views/RankInfo')
	}, {
		path: '/plist/info/:id',
		component: require('../views/PlistInfo')
	}, {
		path: '/singer/list/:id',
		component: require('../views/SingerList')
	}, {
		path: '/singer/info/:id',
		component: require('../views/SingerInfo')
	}, {
		path: '*', redirect: '/'
	}]
})

export default router
