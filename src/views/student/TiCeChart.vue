<template>
	<div class="al-flex-between">
		<h3 class="title">学生体测得分数据分析</h3>
	</div>
	<div id='gradeChat' style="height: 300px;"></div>
</template>

<script setup>
	import {getStudentInfo,getStudentData} from '@/api/base'
	import echarts from '@/utils/echarts.js'
	const props = defineProps(['studentId','chartData'])
	const studentId = ref('')
	const chartData = ref({})
	const xAxisData = ref([])
	watch(props,(n,o)=>{
		chartData.value = props.chartData
		if(n.chartData.yAxisData){
			xAxisData.value = Object.values(n.chartData.yAxisData)
		}
		console.log(n.chartData.yAxisData)
	})
	onMounted(() => {
		console.log(chartData.value)
		// if(!studentId.value) return
		let gradeChat = echarts.init(document.getElementById("gradeChat"));
		const gradeChatOption = {
			title: {
				subtext: '得分',
				left: 30, // 距离左边位置
				top: 15, // 距离上面位置
				subtextStyle: { // 设置二级标题的样式
					color: "#baf"
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: []
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
				data: xAxisData.value
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: '体重指数',
					type: 'line',
					data: [0]
				},
				{
					name: '肺活量',
					type: 'line',
					data: [0]
				},
				{
					name: '50米跑',
					type: 'line',
					data: [0]
				},
				{
					name: '坐位体前屈',
					type: 'line',
					stack: 'Total',
					data: [0]
				},
				{
					name: '1分钟跳绳',
					type: 'line',
					data: [10]
				}
			]
		};
		setTimeout(()=>{
			gradeChatOption.xAxis.data = xAxisData.value
			gradeChatOption.series = chartData.value.series
			gradeChatOption.legend.data = chartData.value.legendData
			gradeChat.setOption(gradeChatOption);
		},1000)
		// gradeChat.setOption(gradeChatOption);
		window.onresize = function() {
			gradeChat.resize();
		};
	})
</script>

<style lang="scss">
	
</style>
