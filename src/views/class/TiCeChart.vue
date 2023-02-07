<template>
	<div>
		<div class="al-flex-between">
			<h3 class="title" style="margin-bottom: 0;">各项体测指标均值分析</h3>
		</div>
		<div id='gradeChat' style="height: 300px;"></div>
		<a class="download-a" :href="downloadUrl" download target="_blank">下载</a>
		<div class="">
			<h3 class="title" style="">各项体测指标等级分析</h3>
			<ul class="ty-tab" style="margin-bottom: 30px;">
				<li :class="{'active':tabIndex===index}" v-for="(tab,index) in tabs" @click="tabClick(index,tab.id)">{{tab.name}}</li>
			</ul>
			<el-row>
				<el-col :span="10">
					<div id='pieChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全班学生总体占比</h4>
						<p>全班应测人数{{data.chart.student_num}}人，实测人数{{data.chart.test_student_num}}人</p>
					</div>
				</el-col>
				<el-col :span="7">
					<div id='boyChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全班男生占比</h4>
						<p>应测男生人数{{data.boyChart.student_num}}人，实测人数{{data.boyChart.test_student_num}}人</p>
					</div>
				</el-col>
				<el-col :span="7">
					<div id='girlChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全班女生占比</h4>
						<p>应测女生人数{{data.girlChart.student_num}}人，实测人数{{data.girlChart.test_student_num}}人</p>
					</div>
				</el-col>
			</el-row>
			<p style="margin-bottom: 40px;"></p>
			<a class="download-a" :href="downloadUrl1" download target="_blank">下载</a>
		</div>
	</div>
</template>

<script setup>
	import {getClassTCAvg,getClassProjectD} from '@/api/base'
	import echarts from '@/utils/echarts.js'
	import qs from 'qs'
	const props = defineProps(['classId','planQuery','projects','tabIndex'])
	const downloadUrl = ref('')
	const downloadUrl1 = ref('')
	const avgData = ref({})
	const classId = ref('')
	const planQuery = ref({})
	const tabs = ref([{id:1,name:'体重指数'},])
	const tabIndex = ref(0)
	const option = ref({})
	const gradeChatOption = ref({})
	const myChart = shallowRef(null)
	const gradeChat = shallowRef(null)
	const boyChart = shallowRef(null)
	const girlChart = shallowRef(null)
	const projectId = ref('')
	//饼图
	const data = reactive({
		chart:[],
		boyChart:[],
		girlChart:[]
	})
	const tabClick = (index,id)=>{
		tabIndex.value = index
		projectId.value = id
		adClassProjectD()
		console.log(id)
	}
	watch(props,(n,o)=>{
		console.log(n)
		classId.value = n.classId
		planQuery.value = n.planQuery
		tabs.value = n.projects
		initData()
	})
	onMounted(() => {
		gradeChat.value = echarts.init(document.getElementById("gradeChat"));
		myChart.value = echarts.init(document.getElementById("pieChart"));
		boyChart.value = echarts.init(document.getElementById("boyChart"));
		girlChart.value = echarts.init(document.getElementById("girlChart"));
		gradeChatOption.value = {
			title: {
				subtext: '得分',
				left: 70, // 距离左边位置
				top: 15, // 距离上面位置
				subtextStyle: { // 设置二级标题的样式
					color: "#baf"
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['得分']
			},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: '得分',
				type: 'bar',
				barWidth: 15,
				color:"#13C5D8",
				data: [120, 132, 101, 134, 90, 230],
			}]
		};
		option.value = {
			tooltip: {
				trigger: 'item',
				formatter: '{b} <br/> ({c}人/{d}%)'
			},
			legend: {
				type: 'scroll',
				orient: 'vertical',
				left: '0'
			},
			series: [{
				name: '',
				type: 'pie',
				radius: [20, 80],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8
				},
				data: [{
						value: 40,
						name: '正常'
					},
					{
						value: 38,
						name: '低体重'
					},
					{
						value: 32,
						name: '超重'
					},
					{
						value: 30,
						name: '肥胖'
					}
				]
			}]
		};
				
		window.onresize = function() {
			gradeChat.value.resize();
		};
	})
	const initData = ()=>{
		planQuery.value.class_id=classId.value
		downloadUrl.value = import.meta.env.VITE_API_HOST+'/score/class_test_avg/?'+qs.stringify(planQuery.value)
		downloadUrl.value += '&download=1&token='+localStorage.getItem('token')
		getClassTCAvg(planQuery.value).then(res=>{
			avgData.value.xAxis = res.map(v=>{return v.name})
			avgData.value.data = res.map(v=>{return v.value})
			gradeChatOption.value.xAxis.data = avgData.value.xAxis
			gradeChatOption.value.series[0].data = avgData.value.data
			gradeChat.value.setOption(gradeChatOption.value);
		})
		adClassProjectD()
	}
	const adClassProjectD =()=>{
		let params = {
			class_id:classId.value,
			project_id:projectId.value || 3
		}
		downloadUrl1.value = import.meta.env.VITE_API_HOST+'/score/class_project_grade/?'+qs.stringify({...params,...planQuery.value})
		downloadUrl1.value += '&download=1&token='+localStorage.getItem('token')
		//获取饼图数据
		getClassProjectD({...params,...planQuery.value}).then(res=>{
			console.log(res)
			data.chart = res.score_grade_chart
			data.boyChart = res.score_grade_chart_boy
			data.girlChart = res.score_grade_chart_girl
			
			option.value.series[0].data = res.score_grade_chart.data
			myChart.value.setOption(option.value);
			delete(option.value.legend)
			option.value.series[0].data = res.score_grade_chart_boy.data
			boyChart.value.setOption(option.value);
			option.value.series[0].data = res.score_grade_chart_girl.data
			girlChart.value.setOption(option.value);
		})
	}
</script>

<style lang="scss" scoped>
	.chart-bottom{
		text-align:center;
		font-size: 14px;
		color: #222426;
		h4{
			font-size: 16px;
			margin:0;
			margin-bottom: 15px;
		}
	}
</style>
