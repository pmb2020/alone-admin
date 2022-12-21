<template>
	<div id='barChat' style="height: 300px;">
	</div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	onMounted(() => {
		let myChart = echarts.init(document.getElementById("barChat"));
		const option = {
			legend: {},
			tooltip: {},
			dataset: {
				source: [
					['product', '2020', '2021', '2022'],
					['苹果', 43.3, 85.8, 93.7],
					['香蕉', 83.1, 73.4, 55.1],
					['橘子', 86.4, 65.2, 82.5],
					['西瓜', 72.4, 53.9, 39.1]
				]
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {},
			series: [{
				type: 'bar'
			}, {
				type: 'bar'
			}, {
				type: 'bar'
			}]
		};
		myChart.setOption(option);
		window.onresize = function() {
			myChart.resize();
		};
	})
</script>

<style>
</style>
