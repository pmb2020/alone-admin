import { createRouter ,createWebHashHistory} from "vue-router";
import Test from "../components/Test.vue"

const routes = [
	{
		path:'/',
		redirect:'/dashboard'
	},
	{
		path:'/dashboard',
		name:'Dashboard',
		component: () => import('../views/Index.vue')
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