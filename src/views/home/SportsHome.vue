<template>
	<div>
		<div class="ty-box">
			<h3 class="title">全区情况</h3>
			<el-row :gutter="20">
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">200</span>所</p>
						<p>学校数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">100</span>人</p>
						<p>老师数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">50</span>个</p>
						<p>班级数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">200</span>所</p>
						<p>学校数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">7899</span>人</p>
						<p>学生数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">3265</span>人</p>
						<p>男生数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">4246</span>人</p>
						<p>女生数量</p>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="tx-text-num">
						<p><span class="num">523</span>台</p>
						<p>设备数量</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="ty-box">
			<h3 class="title">全区学生体重指数占比</h3>
			<WeightChart />
		</div>
		<div class="ty-box">
			<h3 class="title">全区各项体测指标分析</h3>
			<p>图表</p>
		</div>
	</div>
</template>

<script setup>
	import WeightChart from './WeightChart.vue'
</script>

<style lang="scss">
	.tx-text-num{
		color: #666;
		font-size:14px;
		& p:first-child{
			margin-bottom: 10px;
		}
		.num{
			font-size:18px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			margin-right: 2px;
			color: #005EFF;
		}
	}
</style>