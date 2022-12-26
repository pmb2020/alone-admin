<template>
	<div>
		<div class="ty-box" style="display: flex;">
			<el-row style="width: 80%;">
				<el-col :span="6">
					<div class="text-lr">
						<span>老师姓名</span>
						<span class="value">加菲猫</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>工龄</span>
						<span class="value">女</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>年龄</span>
						<span class="value">15</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>学号</span>
						<span class="value">19103</span>
					</div>
				</el-col>
				<el-col :span="24">
					<div class="text-lr">
						<span>所带班级</span>
						<span class="value">2021级一年级（1）班</span>
					</div>
				</el-col>
			</el-row>
			<div>
				<p>照片</p>
			</div>
		</div>
		<div class="ty-box">
			<!-- <h3 class="title">学生体测数据展示</h3> -->
			<div class="al-flex-between" style="margin-bottom: 20px;">
				<h3 class="title" style="margin-bottom: 0;">各项体测指标均值分析</h3>
				<div class="al-flex" style="align-items: center;">
					<p style="color: #222426;">体测计划</p>
					<el-select v-model="value" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option label="2021年7期" value="item.value" />
						<el-option label="2021年8期" value="item.value" />
					</el-select>
					<span style="width: 25px;height: 1px;background: #979797;"></span>
					<el-select v-model="value" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option label="2021年7期" value="item.value" />
						<el-option label="2021年8期" value="item.value" />
					</el-select>
					<el-button type="primary">查询</el-button>
				</div>
			</div>
			<TiCeChart></TiCeChart>
		</div>
	</div>
</template>

<script setup>
	import TiCeChart from './TiCeChart.vue'
</script>

<style lang="scss">
	.text-lr {
		font-family: PingFangSC-Regular, PingFang SC;
		color: #666;
		font-size: 14px;
		margin-bottom: 20px;

		.value {
			margin-left: 20px;
			color: #222426;
		}
	}
	.tip-text{
		font-size: 14px;
		color: #979797;
		margin: 30px 30px;
	}
</style>
