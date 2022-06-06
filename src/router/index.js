import { createRouter ,createWebHashHistory} from "vue-router";
import Layout from '@/layout/index.vue'

const routes = [
	{
		path:'/login',
		hidden: true,
		component:() => import('../views/Home.vue')
	},
	{
		path:'/',
		redirect:'/home',
		component: Layout,
		meta:{
			title:'首页',
		},
		children:[
			{
				path:'home',
				component: () => import('../views/Home.vue')
			}
		]
	},
	{
		path:'/setting',
		redirect: '/setting/index',
		component: Layout,
		meta:{
			title:'系统设置',
		},
		children:[
			{
				path:'index',
				component: () => import('../views/Setting.vue')
			}
		]
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router