import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {adminInfo} from '../others/apis.js'
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
	},
	{
		path: '/config',
		name: 'Config',
		component: () => import( /* webpackChunkName: "about" */ '../views/Config.vue'),
		meta: ['系统配置']
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to,from,next) =>{
	let token=localStorage.getItem('token');
	if(!token && to.name !='Login'){
		next('/login')
	}else if(!localStorage.getItem('adInfo') && token){
		adminInfo().then(res=>{
			localStorage.setItem('adInfo',JSON.stringify(res.data))
		}).catch(err=>{
			localStorage.setItem('adInfo','')
		})
		next();
	}else{
		next();
	}
})
export default router
