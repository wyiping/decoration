import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Find from '@/components/find'
import User from '@/components/user'
import Question from '@/components/question'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Home,
			children: [
				{ path: '', component: resolve => require(['@/components/page/recommend'], resolve) },
				{ path: 'recommend', component: resolve => require(['@/components/page/recommend'], resolve) },
				{ path: 'hot', component: resolve => require(['@/components/page/hot'], resolve) },
				{ path: 'strategy', component: resolve => require(['@/components/page/strategy'], resolve) },
				{ path: 'local', component: resolve => require(['@/components/page/local'], resolve) },
				{ path: 'choose', component: resolve => require(['@/components/page/choose'], resolve) },
				{ path: 'case', component: resolve => require(['@/components/page/case'], resolve) },
				{ path: 'design', component: resolve => require(['@/components/page/design'], resolve) },
				{ path: 'household', component: resolve => require(['@/components/page/household'], resolve) },
				{ path: 'pictures', component: resolve => require(['@/components/page/pictures'], resolve) }
			]
		},
		{
			path: '/find',
			component: Find,
		},
		{
			path: '/question',
			component: Question,
		},
		{
			path: '/user',
			component: User,
		},
		{
			path: '/login',
			component: resolve => require(['@/components/page/login'], resolve)
		},
		{
			path: '/register',
			component: resolve => require(['@/components/page/register'], resolve)
		}
	]
})
