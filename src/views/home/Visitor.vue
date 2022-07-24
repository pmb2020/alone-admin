<template>
	<div id='visitor' style="height: 300px;">
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import echarts from '@/until/echarts.js'
	onMounted(() => {
		let myChart = echarts.init(document.getElementById("visitor"));
		const option = {
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [620, 932, 408, 934, 1290, 1030, 1520],
				type: 'line',
				smooth: true,
				areaStyle: {}
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
