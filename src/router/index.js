import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		children: [{
				path: '/about',
				component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
				meta:['关于']
			},
			{
				path: '/index',
				component: () => import( /* webpackChunkName: "about" */ '../pages/Index.vue'),
				meta:['']
			},
			{
				path: '/manage',
				component: () => import( /* webpackChunkName: "about" */ '../pages/Manage.vue'),
				meta:['账户管理']
			},
			{
				path: '/article',
				component: () => import( /* webpackChunkName: "about" */ '../pages/Article.vue'),
				meta:['文章管理']
			},
			{
				path: '/create',
				component: () => import( /* webpackChunkName: "about" */ '../pages/Create.vue'),
				meta:['发表文章']
			}
		]
	},
	{
		path: '/about',
		name: 'About',
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
	}
]

const router = new VueRouter({
	// mode:'history',
	routes
})

// 注册路由导航守卫
router.beforeEach((to,from,next)=>{
	let token=localStorage.getItem('token');
	token ? next() : to.path == '/login' ? next() : next('/login')
	// if(token){
	// 	next()
	// }else{
	// 	if(to.path !='/login'){
	// 		next('/login')
	// 	}else{
	// 		next()
	// 	}
	// }

})
export default router

// 解决路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
