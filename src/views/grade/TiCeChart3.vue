<template>
	<div style="margin-top: 50px;">
		<div id="myChart" style="height: 220px;"></div>
		<h3 class="title" style="margin-top: 15px;text-align: center;">本年级各班总体等级对比分析</h3>
	</div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	const props = defineProps(['data'])
	const myChart = shallowRef(null)
	const option = ref({})
	const chartData = ref()
	watch(props,(n,o)=>{
		console.log(n.data,'tice3')
		chartData.value = n.data
		adjustChart()
	})
	onMounted(() => {
		myChart.value = echarts.init(document.getElementById("myChart"));
		option.value = {
			title: {
				subtext: '人数',
				left: 25, // 距离左边位置
				top: 15, // 距离上面位置
				subtextStyle: { // 设置二级标题的样式
					color: "#baf"
				}
			},
			tooltip: {},
			legend: {},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			yAxis: {
				type: 'value'
			},
			xAxis: {
				type: 'category',
				data: ['（1）班', '（2）班', '（3）班']
			},
			series: [{
					name: '正常',
					type: 'bar',
					barWidth: 15,
					stack: 'total',
					label: {
						show: true
					},
					data: [0, 0, 0]
				},
				{
					name: '低体重',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					data: [0, 0, 0]
				},
				{
					name: '超重',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					data: [0, 0, 0]
				},
				{
					name: '肥胖',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					data: [0, 0, 0]
				},
			]
		};
		myChart.value.setOption(option.value);
	})
	//调整表格
	const adjustChart = ()=>{
		option.value.xAxis.data = chartData.value.title
		option.value.series = chartData.value.series
		// console.log(chartData.value,'调整')
		myChart.value.setOption(option.value);
	}
</script>

<style>
</style>
