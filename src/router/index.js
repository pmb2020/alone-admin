import { createRouter ,createWebHashHistory} from "vue-router";
import Layout from '@/layout/index.vue'

const routes = [
	{
		path:'/',
		redirect:'/home',
		component: Layout,
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