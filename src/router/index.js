import {
	createRouter,
	createWebHashHistory
} from "vue-router";
import Layout from '@/layout/index.vue'
// import Layout from '@/layout/TopLayout.vue'

const routes = [{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		hidden: true,
		component: () => import('@/layout/NotFound.vue')
	},
	{
		path: '/login',
		name: 'Login',
		hidden: true,
		component: () => import('../views/Login.vue')
	},
	{
		path: '/',
		redirect: '/home',
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		children: [{
			path: 'home',
			component: () => import('../views/home/Index.vue'),
			meta: {
				title: '首页',
				icon: 'HomeFilled'
			},
		}]
	},
	{
		path: '/banner',
		component: Layout,
		children: [{
			path: 'index',
			component: () => import('../views/Banner.vue'),
			meta: {
				title: '广告管理',
				icon: 'Picture'
			},
		}]
	},
	{
		path: '/order',
		component: Layout,
		children: [{
			path: 'index',
			component: () => import('../views/Order.vue'),
			meta: {
				title: '订单管理',
				icon: 'GoodsFilled'
			},
		}]
	},
	{
		path: '/list',
		redirect: '/list/table',
		component: Layout,
		meta: {
			title: '列表展示',
			icon: 'Document'
		},
		children: [{
				path: 'table',
				component: () => import('../views/Table.vue'),
				meta: {
					title: '表格列表',
				},
			},
			{
				path: 'text',
				component: () => import('../views/Article.vue'),
				meta: {
					title: '文章列表',
				},
			},
		]
	},
	{
		path: '/user',
		component: Layout,
		children: [{
			path: 'index',
			component: () => import('../views/User.vue'),
			meta: {
				title: '用户管理',
				icon: 'UserFilled'
			},
		}]
	},
	{
		path: '/setting',
		redirect: '/setting/index',
		component: Layout,
		children: [{
			path: 'index',
			component: () => import('../views/Setting.vue'),
			meta: {
				title: '系统设置',
				icon: 'Basketball'
			},
		}]
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to, form, next) => {
	// let url = 'Setting.vue'
	// router.addRoute({
	// 	path: '/wangbo',
	// 	component: Layout,
	// 	children: [{
	// 		path: 'index',
	// 		component: () => import(`../views/${url}`),
	// 		meta: {
	// 			title: '订单管理',
	// 			icon: 'GoodsFilled'
	// 		},
	// 	}]
	// })
	// console.log(router.getRoutes(), '查看现有路由')
	// next()
	let token = localStorage.getItem('token')
	if (!token && to.name !== 'Login') {
		return {
			name: 'Login'
		}
	}
})

export default router
