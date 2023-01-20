<template>
	<div>
		<div class="al-flex-between">
			<h3 class="title" style="margin-bottom: 0;">各项体测指标均值分析</h3>
		</div>
		<div id='gradeChat' style="height: 300px;"></div>
		<div class="">
			<h3 class="title" style="">各项体测指标等级分析</h3>
			<ul class="ty-tab" style="margin-bottom: 30px;">
				<li :class="{'active':tabIndex===index}" v-for="(tab,index) in tabs" @click="tabClick(index)">{{tab.name}}</li>
			</ul>
			<el-row>
				<el-col :span="10">
					<div id='pieChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全区学生总体占比</h4>
						<p>全区应测人数{{data.chart.student_num}}人，实测人数{{data.chart.test_student_num}}人</p>
					</div>
				</el-col>
				<el-col :span="7">
					<div id='boyChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全区男生占比</h4>
						<p>应测男生人数{{data.boyChart.student_num}}人，实测人数{{data.boyChart.test_student_num}}人</p>
					</div>
				</el-col>
				<el-col :span="7">
					<div id='girlChart' style="height: 220px;"></div>
					<div class="chart-bottom">
						<h4>全区女生占比</h4>
						<p>应测女生人数{{data.girlChart.student_num}}人，实测人数{{data.girlChart.test_student_num}}人</p>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
	import {getClassTCAvg,getClassProjectD} from '@/api/base'
	import echarts from '@/utils/echarts.js'
	const props = defineProps(['classId','planQuery','projects'])
	const avgData = ref({})
	const classId = ref('')
	const planQuery = ref({})
	const tabs = ref([{id:1,name:'体重指数'},])
	const tabIndex = ref(0)
	//饼图
	const data = reactive({
		chart:[],
		boyChart:[],
		girlChart:[]
	})
	const tabClick = (index)=>{
		tabIndex.value = index
	}
	watch(props,(n,o)=>{
		console.log(n)
		classId.value = n.classId
		planQuery.value = n.planQuery
		tabs.value = n.projects
		initData()
	})
	onMounted(() => {
		let gradeChat = echarts.init(document.getElementById("gradeChat"));
		let myChart = echarts.init(document.getElementById("pieChart"));
		let boyChart = echarts.init(document.getElementById("boyChart"));
		let girlChart = echarts.init(document.getElementById("girlChart"));
		const gradeChatOption = {
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
		const option = {
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
				name: '全区学生总体占比',
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
		
		setTimeout(()=>{
			gradeChatOption.xAxis.data = avgData.value.xAxis
			gradeChatOption.series[0].data = avgData.value.data
			gradeChat.setOption(gradeChatOption);
			//饼图
			option.series[0].data = data.chart.data
			myChart.setOption(option);
			delete(option.legend)
			option.series[0].data = data.boyChart.data
			boyChart.setOption(option);
			option.series[0].data = data.girlChart.data
			girlChart.setOption(option);
		},1000)
		
		window.onresize = function() {
			gradeChat.resize();
		};
	})
	const initData = ()=>{
		let params = {
			class_id:classId.value,
		}
		getClassTCAvg({...params,...planQuery.value}).then(res=>{
			avgData.value.xAxis = res.map(v=>{return v.name})
			avgData.value.data = res.map(v=>{return v.value})
		})
		//获取饼图数据
		getClassProjectD({...params,...planQuery.value}).then(res=>{
			console.log(res)
			data.chart = res.score_grade_chart
			data.boyChart = res.score_grade_chart_boy
			data.girlChart = res.score_grade_chart_girl
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
