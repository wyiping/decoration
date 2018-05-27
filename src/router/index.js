import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/home',
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
			path: '/detaile',
			name: 'detaile',
			component: resolve => require(['@/components/page/detaile'], resolve)
		},
		{
			path: '/find',
			component: resolve => require(['@/components/find'], resolve),
		},
		{
			path: '/questions',
			component: resolve => require(['@/components/questions'], resolve),
		},
		{
			path: '/question/:id',
			component: resolve => require(['@/components/page/question'], resolve),
		},
		{
			path: '/myquestions',
			component: resolve => require(['@/components/my_a&q'], resolve),
			children: [
				{ path: '', component: resolve => require(['@/components/page/my_questions'], resolve) },
				{ path: 'questions', component: resolve => require(['@/components/page/my_questions'], resolve) },
				{ path: 'answer', component: resolve => require(['@/components/page/my_answer'], resolve) },
			]
		},
		{
			path: '/ask',
			component: resolve => require(['@/components/page/ask'], resolve),
		},
		{
			path: '/user',
			component: resolve => require(['@/components/user'], resolve),
		},
		{
			path: '/login',
			component: resolve => require(['@/components/page/login'], resolve)
		},
		{
			path: '/register',
			component: resolve => require(['@/components/page/register'], resolve)
		},
		{
			path: '*',
			redirect: '/home'
		},
		{
			path: '',
			redirect: '/home'
		}
	]
})
