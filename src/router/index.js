import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const router = new VueRouter({
	routes:[{
    path:'/index',component:require('../views/index')
  },{
    path:'/rank',component:require('../views/rank')
  },{
    path:'/ringtone',component:require('../views/ringtone')
  },{
    path:'/plist',component:require('../views/plist')
  },{
    path:'/singer',component:require('../views/singer')
  },{
    path:'/search',component:require('../views/search')
  },{
    path:'/rank/info/:id',component:require('../views/rank_info')
  },{
    path:'/plist/info/:id',component:require('../views/plist_info')
  },{
    path:'/singer/list/:id',component:require('../views/singer_list')
  },{
    path:'/singer/info/:id',component:require('../views/singer_info')
  },{
    path:'*',redirect:'/index'
  }]
});


export default router;
