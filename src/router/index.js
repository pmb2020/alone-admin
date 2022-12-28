import { createRouter ,createWebHashHistory} from "vue-router";
// import Layout from '@/layout/index.vue'
import Layout from '@/layout/TopLayout.vue'

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
		redirect:'sports/home',
		hidden: true
	},
	{
		path:'/',
		component: Layout,
		children:[
			{
				path:'sports/home',
				component: () => import('../views/home/SportsHome.vue'),
				meta:{
					title:'智慧体测平台首页',
					icon:'HomeFilled'
				},
			}
		]
	},
	{
		path:'/base',
		component: Layout,
		meta:{
			title:'基础信息管理',
			icon:'Discount'
		},
		children:[
			{
				path:'student',
				component: () => import('../views/student/Index.vue'),
				meta: {
				  title: '学生信息管理',
				},
			},
			{
				path:'student/info',
				hidden: true,
				component: () => import('../views/student/Info.vue'),
			},
			{
				path:'class/info',
				hidden: true,
				component: () => import('../views/class/Info.vue'),
			},
			{
				path:'grade/info',
				hidden: true,
				component: () => import('../views/grade/Info.vue'),
			},
			{
				path:'teacher/info',
				hidden: true,
				component: () => import('../views/teacher/Info.vue'),
			},
			{
				path:'class',
				component: () => import('../views/class/Index.vue'),
				meta: {
				  title: '班级信息管理',
				},
			},
			{
				path:'grade',
				component: () => import('../views/grade/Index.vue'),
				meta: {
				  title: '年级信息管理',
				},
			},
			{
				path:'teacher',
				component: () => import('../views/teacher/Index.vue'),
				meta: {
				  title: '老师信息管理',
				},
			},
		]
	},
	{
		path:'/ticeChart',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/ticeChart/index.vue'),
				meta:{
					title:'体测项目数据分析',
					icon:'DataLine'
				},
			}
		]
	},
	{
		path:'/ticeBZ',
		component: Layout,
		meta:{
			title:'国家体测标准',
			icon:'Tickets'
		},
		children:[
			{
				path:'primary',
				component: () => import('../views/ticeBZ/Primary.vue'),
				meta: {
				  title: '小学体测标准评分',
				},
			},
			{
				path:'middle',
				component: () => import('../views/ticeBZ/Middle.vue'),
				meta: {
				  title: '初中体测标准评分',
				},
			},
			{
				path:'high',
				component: () => import('../views/ticeBZ/High.vue'),
				meta: {
				  title: '高中体测标准评分',
				},
			},
			{
				path:'exam',
				component: () => import('../views/ticeBZ/Exam.vue'),
				meta: {
				  title: '考试项目标准',
				},
			},
		]
	},
	{
		path:'/plan',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/plan/Index.vue'),
				meta:{
					title:'体测计划管理',
					icon:'SetUp'
				},
			}
		]
	},
	{
		path:'/device',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/device/Index.vue'),
				meta:{
					title:'设备信息管理',
					icon:'Monitor'
				},
			}
		]
	},
	{
		path:'/user',
		redirect:'/user/index',
		component: Layout,
		meta:{
			title:'用户管理',
			icon:'UserFilled'
		},
		children:[
			{
				path:'index',
				component: () => import('../views/user/Index.vue'),
				meta: {
				  title: '用户列表',
				},
			},
			{
				path:'school',
				component: () => import('../views/user/School.vue'),
				meta: {
				  title: '学校列表',
				},
			},
			{
				path:'role',
				component: () => import('../views/user/Role.vue'),
				meta: {
				  title: '角色列表',
				},
			},
		]
	},
	{
		path:'/person',
		redirect:'/person/index',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/person/Index.vue'),
				meta:{
					title:'个人中心',
					icon:'Avatar'
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