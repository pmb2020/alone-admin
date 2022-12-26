<template>
	<div class="al-flex-between">
		<h3 class="title" style="margin-bottom: 0;">学生体测得分数据分析</h3>
	</div>
	<div id='gradeChat' style="height: 300px;"></div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	onMounted(() => {
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
				data: ['体重指数', '肺活量', '50米跑', '坐位体前屈', '1分钟跳绳']
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
				data: ['2021年第8期', '2022年第1期', '2022年第2期', '2022年第3期', '2022年第4期', '2022年第5期']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: '体重指数',
					type: 'line',
					data: [120, 132, 101, 134, 90, 230]
				},
				{
					name: '肺活量',
					type: 'line',
					data: [220, 182, 191, 234, 290, 330]
				},
				{
					name: '50米跑',
					type: 'line',
					data: [150, 432, 201, 154, 190, 330]
				},
				{
					name: '坐位体前屈',
					type: 'line',
					stack: 'Total',
					data: [320, 232, 301, 334, 390, 330]
				},
				{
					name: '1分钟跳绳',
					type: 'line',
					data: [220, 332, 201, 334, 490, 130]
				}
			]
		};
		gradeChat.setOption(gradeChatOption);
		window.onresize = function() {
			gradeChat.resize();
		};
	})
</script>

<style lang="scss">
	
</style>
