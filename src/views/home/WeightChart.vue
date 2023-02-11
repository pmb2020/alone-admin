<template>
	<div>
		<el-row>
			<el-col :span="10">
				<div id='pieChart' style="height: 220px;"></div>
				<div class="chart-bottom">
					<h4>全区学生总体占比</h4>
					<p>全区应测人数{{homeData.BMI_chart.student_num}}人，实测人数{{homeData.BMI_chart.test_student_num}}人</p>
				</div>
			</el-col>
			<el-col :span="7">
				<div id='boyChart' style="height: 220px;"></div>
				<div class="chart-bottom">
					<h4>全区男生占比</h4>
					<p>应测男生人数{{homeData.BMI_chart_boy.student_num}}人，实测人数{{homeData.BMI_chart_boy.test_student_num}}人</p>
				</div>
			</el-col>
			<el-col :span="7">
				<div id='girlChart' style="height: 220px;"></div>
				<div class="chart-bottom">
					<h4>全区女生占比</h4>
					<p>应测女生人数{{homeData.BMI_chart_girl.student_num}}人，实测人数{{homeData.BMI_chart_girl.test_student_num}}人</p>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	const props = defineProps(['data','boydata','homeData'])
	import {getHomeDataEdu} from '@/api/home'
	const data = ref({
		chart:[],
		boyChart:[],
		girlChart:[]
	})
	const girlChart = shallowRef({})
	const boyChart = shallowRef({})
	const myChart = shallowRef({})
	const option = ref({})
	watch(props,(n,o)=>{
		// console.log(n.homeData)
		data.value.chart = n.homeData.BMI_chart
		data.value.girlChart = n.homeData.BMI_chart_girl
		data.value.boyChart = n.homeData.BMI_chart_boy
		initData()
	})
	onMounted(() => {
		myChart.value = echarts.init(document.getElementById("pieChart"));
		boyChart.value = echarts.init(document.getElementById("boyChart"));
		girlChart.value = echarts.init(document.getElementById("girlChart"));
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
		window.onresize = function() {
			myChart.value.resize();
			boyChart.value.resize();
			girlChart.value.resize();
		};
	})
	const initData = ()=>{
		option.value.series[0].data = data.value.chart.data
		myChart.value.setOption(option.value);
		delete(option.value.legend)
		option.value.series[0].data = data.value.boyChart.data
		boyChart.value.setOption(option.value);
		option.value.series[0].data = data.value.girlChart.data
		girlChart.value.setOption(option.value);
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
