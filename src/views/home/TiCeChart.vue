<template>
	<div class="al-flex-between">
		<!-- <h3 class="title" style="margin-bottom: 0;">全区各项体测指标分析</h3> -->
		<h3 class="title" style="margin-bottom: 0;">全区各项体测指标记录</h3>
		<ul class="ty-tab">
			<li :class="{'active':gTabIndex==0}" @click="gTabClick(0)">小学</li>
			<li :class="{'active':gTabIndex==1}" @click="gTabClick(1)">初中</li>
			<li :class="{'active':gTabIndex==2}" @click="gTabClick(2)">高中</li>
		</ul>
	</div>
	<div style="display: flex;justify-content: flex-end;align-items: center;margin-top: 20px;">
		<p style="color: #222426;">体测计划</p>
		<el-select v-model="planParams.plan_start_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
			<el-option v-for="plan in plans" :label="plan.name" :value="plan.id" />
		</el-select>
		<span style="width: 25px;height: 1px;background: #979797;"></span>
		<el-select v-model="planParams.plan_end_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
			<el-option v-for="plan in plans" :label="plan.name" :value="plan.id" />
		</el-select>
		<el-button type="primary" @click="getTiCeData">查询</el-button>
	</div>
	<div style="margin: 30px 0;">
		<ul class="ty-tab">
			<li :class="{'active':tabIndex===index}" v-for="(tab,index) in projects" @click="tabClick(index,tab.id)">
				{{tab.name}}</li>
		</ul>
	</div>
	<h3 class="title">各项体测指标等级分析</h3>
	<div id='barChat' style="height: 300px;"></div>
	<h3 class="title">各项体测指标均值分析</h3>
	<div id='gradeChat' style="height: 300px;"></div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	import {
		getProjectChat,
		getProjectChatEdu,
		getGradeChartEdu
	} from '@/api/home'
	const props = defineProps(['homeData', 'userType'])
	const projects = ref([])
	const homeData = ref({})
	const plans = ref([])
	const planOpt = ref({
		'xiaoxue' :[],
		'chuzhong':[],
		'gaozhong':[]
	})
	const planParams = ref({
		plan_start_id:'',
		plan_end_id:''
	})
	const tabs = ref([{
		id: 1,
		name: '体重指数'
	}, ])
	watch(props, (n, o) => {
		homeData.value = n.homeData
		projects.value = n.homeData.projects[0].小学
		// console.log(projects.value, '监听')
		// console.log(homeData.value.plan_data[0].小学, '监听')
		planOpt.value = {
			xiaoxue :homeData.value.plan_data[0].小学,
			chuzhong:homeData.value.plan_data[1].初中,
			gaozhong:homeData.value.plan_data[2].高中
		}
		plans.value = planOpt.value.xiaoxue
		if(n.homeData.projects[0].id){
			project_id.value = n.homeData.projects[0].id
		}
		// console.log(planOpt.value)
	})
	// const tabs = ref(props.homeData.projects.小学)
	const tabIndex = ref(0)
	const tabClick = (index, id) => {
		tabIndex.value = index
		project_id.value = id
		getTiCeData()
	}
	const gradeChat = ref(null)
	const barChat = ref(null)
	const gradeChatOption = ref(null)
	const option = ref(null)
	const project_id = ref('')
	const gTabIndex = ref(0)
	const gTabClick = (index) => {
		tabIndex.value = 0
		project_id.value = projects.value[0].id
		gTabIndex.value = index
		planParams.value.plan_start_id=''
		planParams.value.plan_end_id=''
		if (index == 0) {
			plans.value = planOpt.value.xiaoxue
			projects.value = homeData.value.projects[0].小学
		} else if (index == 1) {
			plans.value = planOpt.value.chuzhong
			projects.value = homeData.value.projects[1].初中
		} else if (index == 2) {
			plans.value = planOpt.value.gaozhong
			projects.value = homeData.value.projects[2].高中
		}
		if(plans.value){
			planParams.value.plan_start_id= plans.value[0].id
			planParams.value.plan_end_id= plans.value[plans.value.length-1].id
		}
		getTiCeData()
	}
	onMounted(() => {
		getTiCeData()
		barChat.value = echarts.init(document.getElementById("barChat"));
		gradeChat.value = echarts.init(document.getElementById("gradeChat"));
		option.value = {
			legend: {},
			tooltip: {},
			dataset: {
				source: [
					['product','',''],
					['2022年第1期', 83.1, 73.4, 55.1, 22.2],
					['2022年第2期', 86.4, 65.2, 82.5, 35.1],
				]
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {
				type: "value",
				name: "人数",
				nameTextStyle: {
					color: "#aaa",
					nameLocation: "start",
					align: "right",
				},
			},
			series: [{
				type: 'bar',
				name: 'sss'
			}, {
				type: 'bar'
			}, {
				type: 'bar'
			}, {
				type: 'bar'
			}]
		};
		gradeChatOption.value = {
			title: {
				subtext: '得分',
				left: 30, // 距离左边位置
				top: 15, // 距离上面位置
				subtextStyle: { // 设置二级标题的样式
					color: "#baf"
				}
			},
			tooltip: {},
			legend: {
				data: ['体重指数', '肺活量', '50米跑']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['2022年第1期', '2022年第2期', '2022年第3期', '2022年第4期', '2022年第5期']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: '体重指数',
					type: 'line',
					data: [120, 132, 101, 134, 90, 230]
				},
				{
					name: '肺活量',
					type: 'line',
					data: [220, 182, 191, 234, 290, 330]
				},
				{
					name: '50米跑',
					type: 'line',
					data: [150, 432, 201, 154, 190, 330]
				}
			]
		};
		// barChat.value.setOption(option.value);
		gradeChat.value.setOption(gradeChatOption.value);
		window.onresize = function() {
			barChat.value.resize();
			gradeChat.value.resize();
		};
	})
	const getTiCeData = ()=>{
		let params = {
			project_id:project_id.value || 3,
			plan_start_id:planParams.value.plan_start_id,
			plan_end_id:planParams.value.plan_end_id
		}
		if(gTabIndex.value==0){
			params.grade_type='小学'
		}else if(gTabIndex.value==1){
			params.grade_type='初中'
		}else if(gTabIndex.value==2){
			params.grade_type='高中'
		}
		getProjectChatEdu(params).then(res => {
			// console.log(res)
			let series = [{
				type: 'bar',
				name: res.source[0][1]
			}, {
				type: 'bar',
				name: res.source[0][2]
			}, {
				type: 'bar',
				name: res.source[0][3]
			}, {
				type: 'bar',
				name: res.source[0][4]
			}]
			option.value.dataset.source = res.source
			option.value.series = series
			barChat.value.setOption(option.value);
		})
		//线表
		getGradeChartEdu(params).then(res => {
			// console.log(res)
			gradeChatOption.value.legend.data = res.legendData
			gradeChatOption.value.series = res.series
			gradeChatOption.value.xAxis.data = res.yAxisData
			gradeChat.value.setOption(gradeChatOption.value);
		})
	}
</script>

<style lang="scss">

</style>
