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
			path:'/',
			component:Home,
		},
    {
			path:'/find',
			component:Find,
		},
    {
			path:'/question',
			component:Question,
		},
    {
			path:'/user',
			component:User,
		}
  ]
})
