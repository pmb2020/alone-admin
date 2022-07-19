import { createRouter ,createWebHashHistory} from "vue-router";
import Layout from '@/layout/index.vue'

const routes = [
	{
		path:'/:pathMatch(.*)*',
		name:'NotFound',
		hidden: true,
		component: () =>import('@/layout/NotFound.vue')
	},
	{
		path:'/login',
		name:'Login',
		hidden: true,
		component:() => import('../views/Login.vue')
	},
	{
		path:'/',
		redirect:'/home',
		hidden: true
	},
	{
		path:'/',
		component: Layout,
		children:[
			{
				path:'home',
				component: () => import('../views/Home.vue'),
				meta:{
					title:'首页',
					icon:'HomeFilled'
				},
			}
		]
	},
	{
		path:'/list',
		redirect:'/list/table',
		component: Layout,
		meta:{
			title:'列表展示',
			icon:'Document'
		},
		children:[
			{
				path:'table',
				component: () => import('../views/Table.vue'),
				meta: {
				  title: '表格列表',
				},
			},
			{
				path:'text',
				component: () => import('../views/Article.vue'),
				meta: {
				  title: '文章列表',
				},
			},
		]
	},
	{
		path:'/setting',
		redirect: '/setting/index',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/Setting.vue'),
				meta:{
					title:'系统设置',
					icon:'Setting'
				},
			}
		]
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to,form) => {
	let token = localStorage.getItem('token')
	if(!token && to.name !== 'Login'){
		return {name: 'Login'}
	}
})

export default router