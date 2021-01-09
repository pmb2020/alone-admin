import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		meta: ['']
	},
	{
		path: '/login',
		name: 'Login',
		component: ()=> import('../views/Login.vue')
	},
	{
		path: '/account',
		name: 'Account',
		component: ()=> import('../views/Account.vue')
	},
	{
		path: '/about',
		name: 'About',
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
		meta: ['账户管理']
	},
	{
		path: '/article',
		name: 'Article',
		component: () => import( /* webpackChunkName: "about" */ '../views/Article.vue'),
		meta: ['文章列表']
	},
	{
		path: '/article/edit',
		name: 'ArticleEdit',
		component: () => import( /* webpackChunkName: "about" */ '../views/Edit.vue'),
		meta: ['写新文章']
	}
	
]

const router = new VueRouter({
	routes
})

export default router
