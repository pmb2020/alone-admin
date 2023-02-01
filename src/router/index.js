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
		name:"SportsHome",
		component: Layout,
		children:[
			{
				path:'sports/home',
				component: () => import('../views/home/SportsHome.vue'),
				meta:{
					title:'智慧体测平台首页',
					icon:'HomeFilled',
					image:'home.png'
				},
			}
		]
	},
	{
		path:'/base',
		component: Layout,
		name:'base',
		meta:{
			title:'基础信息管理',
			icon:'Discount',
			image:'base.png'
		},
		children:[
			{
				path:'student',
				name:'baseStudent',
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
				path:'school/info',
				hidden: true,
				component: () => import('../views/school/Info.vue'),
			},
			{
				path:'plan/info',
				hidden: true,
				component: () => import('../views/plan/Info.vue'),
			},
			{
				path:'class',
				name:'baseClass',
				component: () => import('../views/class/Index.vue'),
				meta: {
				  title: '班级信息管理',
				},
			},
			{
				path:'grade',
				name:'baseGrade',
				component: () => import('../views/grade/Index.vue'),
				meta: {
				  title: '年级信息管理',
				},
			},
			{
				path:'teacher',
				name:'baseTeacher',
				component: () => import('../views/teacher/Index.vue'),
				meta: {
				  title: '老师信息管理',
				},
			},
			{
				path:'school',
				name:'baseSchool',
				component: () => import('../views/school/Index.vue'),
				meta: {
				  title: '学校信息管理',
				},
			},
		]
	},
	{
		path:'/ticeChart',
		name:'ticeChart',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/ticeChart/Index.vue'),
				meta:{
					title:'体测项目数据分析',
					icon:'DataLine',
					image:'chart.png'
				},
			}
		]
	},
	{
		path:'/ticeBZ',
		name:'ticeBZ',
		component: Layout,
		meta:{
			title:'国家体测标准',
			icon:'Tickets',
			image:'ticeBZ.png'
		},
		children:[
			{
				path:'primary',
				name:'ticeBZPrimary',
				component: () => import('../views/ticeBZ/Primary.vue'),
				meta: {
				  title: '小学体测标准评分',
				},
			},
			{
				path:'middle',
				name:'ticeBZMiddle',
				component: () => import('../views/ticeBZ/Middle.vue'),
				meta: {
				  title: '初中体测标准评分',
				},
			},
			{
				path:'high',
				name:'ticeBZHigh',
				component: () => import('../views/ticeBZ/High.vue'),
				meta: {
				  title: '高中体测标准评分',
				},
			},
			{
				path:'exam',
				name:'ticeBZExam',
				component: () => import('../views/ticeBZ/Exam.vue'),
				meta: {
				  title: '考试项目标准',
				},
			},
		]
	},
	{
		path:'/plan',
		name:'plan',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/plan/Index.vue'),
				meta:{
					title:'体测计划管理',
					icon:'SetUp',
					image:'plan.png'
				},
			}
		]
	},
	{
		path:'/device',
		name:'device',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/device/Index.vue'),
				meta:{
					title:'设备信息管理',
					icon:'Monitor',
					image:'device.png'
				},
			}
		]
	},
	{
		path:'/user',
		redirect:'/user/index',
		name:'user',
		component: Layout,
		meta:{
			title:'用户管理',
			icon:'UserFilled',
			image:'user.png'
		},
		children:[
			{
				path:'index',
				name:'userIndex',
				component: () => import('../views/user/Index.vue'),
				meta: {
				  title: '账号列表',
				},
			},
			{
				path:'school',
				name:'userSchool',
				component: () => import('../views/user/School.vue'),
				meta: {
				  title: '学校列表',
				},
			},
			{
				path:'role',
				name:'userRole',
				component: () => import('../views/user/Role.vue'),
				meta: {
				  title: '权限列表',
				},
			},
		]
	},
	{
		path:'/person',
		name:'person',
		redirect:'/person/index',
		component: Layout,
		children:[
			{
				path:'index',
				component: () => import('../views/person/Index.vue'),
				meta:{
					title:'个人中心',
					icon:'Avatar',
					image:'person.png'
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