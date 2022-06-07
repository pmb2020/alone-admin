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
		hidden: true,
		component:() => import('../views/Home.vue')
	},
	{
		path:'/',
		redirect:'/home',
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
				component: () => import('../views/Home.vue'),
				meta: {
				  title: '表格列表',
				},
			},
			{
				path:'text',
				component: () => import('../views/Home.vue'),
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

export default router