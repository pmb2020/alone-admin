<template>
	<div>
		<div class="al-flex-between">
			<h3 class="title" style="margin-bottom: 0;">各项体测指标均值分析</h3>
		</div>
		<div id='gradeChat' style="height: 300px;"></div>
		<div class="">
			<h3 class="title" style="">各项体测指标等级分析</h3>
			<ul class="ty-tab" style="margin-bottom: 30px;">
				<li :class="{'active':tabIndex===index}" v-for="(tab,index) in tabs" @click="tabClick(index,tab.id)">{{tab.name}}</li>
			</ul>
			<el-row>
				<el-col :span="10">
					<div id='pieChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全年级学生总体占比</h4>
						<p>全年级应测人数{{data.chart.student_num}}人，实测人数{{data.chart.test_student_num}}人</p>
					</div>
				</el-col>
				<el-col :span="7">
					<div id='boyChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全年级男生占比</h4>
						<p>应测男生人数{{data.boyChart.student_num}}人，实测人数{{data.boyChart.test_student_num}}人</p>
					</div>
				</el-col>
				<el-col :span="7">
					<div id='girlChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全年级女生占比</h4>
						<p>应测女生人数{{data.girlChart.student_num}}人，实测人数{{data.girlChart.test_student_num}}人</p>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
	import {getGradeTCAvg,getGradeProjectD} from '@/api/base'
	import echarts from '@/utils/echarts.js'
import { shallowRef } from 'vue';
	const props = defineProps(['gradeId','planQuery','projects','gradeId'])
	const avgData = ref({})
	const gradeId = ref('')
	const planQuery = ref({})
	const tabs = ref([{id:1,name:'体重指数'},])
	const tabIndex = ref(0)
	const projectId = ref('')
	const option = ref({})
	const myChart = shallowRef(null)
	const gradeChat = shallowRef(null)
	const gradeChatOption = ref({})
	const boyChart = shallowRef(null)
	const girlChart = shallowRef(null)
	//饼图
	const data = reactive({
		chart:[],
		boyChart:[],
		girlChart:[]
	})
	const tabClick = (index,id)=>{
		tabIndex.value = index
		console.log(id)
		projectId.value=id
		adClassProjectD()
	}
	watch(props,(n,o)=>{
		console.log(n)
		gradeId.value = n.gradeId
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
				name: '全年级学生总体占比',
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
	})
	const initData = ()=>{
		let params = {
			grade_id:gradeId.value,
		}
		getGradeTCAvg({...params,...planQuery.value}).then(res=>{
			avgData.value.xAxis = res.map(v=>{return v.name})
			avgData.value.data = res.map(v=>{return v.value})
			gradeChatOption.value.xAxis.data = avgData.value.xAxis
			gradeChatOption.value.series[0].data = avgData.value.data
			gradeChat.value.setOption(gradeChatOption.value);
		})
		adClassProjectD()
	}
	const adClassProjectD = ()=>{
		let params = {
			grade_id:gradeId.value,
			project_id:projectId.value || 3
		}
		//获取饼图数据
		getGradeProjectD({...params,...planQuery.value}).then(res=>{
			console.log(res)
			data.chart = res.score_grade_chart
			data.boyChart = res.score_grade_chart_boy
			data.girlChart = res.score_grade_chart_girl
			
			//饼图
			option.value.series[0].data = data.chart.data
			myChart.value.setOption(option.value);
			delete(option.value.legend)
			option.value.series[0].data = data.boyChart.data
			boyChart.value.setOption(option.value);
			option.value.series[0].data = data.girlChart.data
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
