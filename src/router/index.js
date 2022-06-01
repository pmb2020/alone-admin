import { createRouter ,createWebHashHistory} from "vue-router";
import Test from "../components/Test.vue"

const routes = [
	{
		path:'/',
		redirect:'/home'
	},
	{
		path:'/home',
		name:'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path:'/setting',
		name:'Setting',
		component: () => import('../views/Setting.vue')
	},
	{
		path:'/test',
		component: Test
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router