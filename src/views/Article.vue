<template>
	<div id="main" style="height: 300px;"></div>
</template>
<script setup>
	import {onMounted} from "vue";
	import echarts from '../until/echarts.js'
	onMounted(() => {
		let myChart = echarts.init(document.getElementById("main"));
		myChart.setOption({
			 xAxis: {
			    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			  },
			  yAxis: {},
			  series: [
			    {
			      type: 'bar',
			      data: [23, 24, 18, 25, 27, 28, 25]
			    }
			  ]
		});
		window.onresize = function() {
			myChart.resize();
		};
	})
</script>
