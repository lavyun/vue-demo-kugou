import Vue from 'vue'
import VueRouter from 'vue-router'
import NewSongs from '../views/new-songs'
import Rank from '../views/rank'
import PList from '../views/plist'
import PListInfo from '../views/plist-info'
import Singer from '../views/singer'
import Search from '../views/search'
import RankInfo from '../views/rank-info'
import SingerList from '../views/singer-list'
import SingerInfo from '../views/singer-info'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/newSongs',
      name: 'newSongs',
      component: NewSongs,
      alias: '/'
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/plist',
      name: 'plist',
      component: PList
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank/info/:id',
      component: RankInfo
    },
    {
      path: '/plist/info/:id',
      component: PListInfo
    },
    {
      path: '/singer/list/:id',
      component: SingerList
    },
    {
      path: '/singer/info/:id',
      component: SingerInfo
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
