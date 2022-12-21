<template>
	<div id='pieChat' style="height: 300px;">
	</div>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	import echarts from '@/utils/echarts.js'
	onMounted(() => {
		let myChart = echarts.init(document.getElementById("pieChat"));
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				type: 'scroll',
				orient: 'vertical',
				left: '0'
			},
			series: [{
				name: '玫瑰图',
				type: 'pie',
				radius: [20, 150],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8
				},
				data: [{
						value: 40,
						name: 'rose 1'
					},
					{
						value: 38,
						name: 'rose 2'
					},
					{
						value: 32,
						name: 'rose 3'
					},
					{
						value: 30,
						name: 'rose 4'
					},
					{
						value: 28,
						name: 'rose 5'
					},
					{
						value: 26,
						name: 'rose 6'
					}
				]
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
