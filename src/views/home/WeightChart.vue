<template>
	<div>
		<el-row>
			<el-col :span="10">
				<div id='pieChart' style="height: 220px;"></div>
				<div class="chart-bottom">
					<h4>全区学生总体占比</h4>
					<p>全区应测人数900人，实测人数900人</p>
				</div>
			</el-col>
			<el-col :span="7">
				<div id='boyChart' style="height: 220px;"></div>
				<div class="chart-bottom">
					<h4>全区男生占比</h4>
					<p>应测男生人数900人，实测人数900人</p>
				</div>
			</el-col>
			<el-col :span="7">
				<div id='girlChart' style="height: 220px;"></div>
				<div class="chart-bottom">
					<h4>全区女生占比</h4>
					<p>应测男生人数900人，实测人数900人</p>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	onMounted(() => {
		let myChart = echarts.init(document.getElementById("pieChart"));
		let boyChart = echarts.init(document.getElementById("boyChart"));
		let girlChart = echarts.init(document.getElementById("girlChart"));
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
		
		myChart.setOption(option);
		delete(option.legend)
		boyChart.setOption(option);
		girlChart.setOption(option);
		window.onresize = function() {
			myChart.resize();
		};
	})
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
