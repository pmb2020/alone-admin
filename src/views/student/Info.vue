<template>
	<div>
		<div class="ty-box" style="display: flex;">
			<el-row style="width: 80%;">
				<el-col :span="6">
					<div class="text-lr">
						<span>姓名</span>
						<span class="value">加菲猫</span>
					</div>
					<div class="text-lr">
						<span>班级</span>
						<span class="value">1班</span>
					</div>
					<div class="text-lr">
						<span>学校</span>
						<span class="value">北京丰台区时光小学</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>性别</span>
						<span class="value">女</span>
					</div>
					<div class="text-lr">
						<span>学级</span>
						<span class="value">2022级</span>
					</div>
					<div class="text-lr">
						<span>片区</span>
						<span class="value">X03片区</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>年龄</span>
						<span class="value">15</span>
					</div>
					<div class="text-lr">
						<span>年级</span>
						<span class="value">三年级</span>
					</div>
					<div class="text-lr">
						<span>集团</span>
						<span class="value">XXXX集团</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>学号</span>
						<span class="value">19103</span>
					</div>
					<div class="text-lr">
						<span>老师</span>
						<span class="value">史努比</span>
					</div>
					<div class="text-lr">
						<span>教委</span>
						<span class="value">XXXX教委</span>
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
				<h3 class="title" style="margin-bottom: 0;">全区各项体测指记录</h3>
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
			<div style="margin-bottom: 50px;">
				<el-table :data="tableData" style="width: 100%" :border="true">
					<el-table-column label="体测计划" width="180" align="center">
						<template #default="scope">
							<span style="margin-left: 10px">2021年第8期</span>
						</template>
					</el-table-column>
					<el-table-column label="身高" align="center">
						<el-table-column prop="state" label="cm" align="center" />
					</el-table-column>
					<el-table-column label="体重" align="center">
						<el-table-column prop="state" label="kg" align="center" />
					</el-table-column>
					<el-table-column label="总分" align="center">
						<el-table-column prop="state" label="权重" align="center" />
					</el-table-column>
					<el-table-column label="体重指数(BMI)" align="center">
						<el-table-column prop="state" label="成绩" />
						<el-table-column prop="city" label="得分" />
						<el-table-column prop="address" label="等级" />
					</el-table-column>
					<el-table-column label="肺活量" align="center">
						<el-table-column prop="state" label="成绩" />
						<el-table-column prop="city" label="得分" />
						<el-table-column prop="address" label="等级" />
					</el-table-column>
					<el-table-column label="50m跑" align="center">
						<el-table-column prop="state" label="成绩" />
						<el-table-column prop="city" label="得分" />
						<el-table-column prop="address" label="等级" />
					</el-table-column>
					<el-table-column label="坐位体前屈" align="center">
						<el-table-column prop="state" label="成绩" />
						<el-table-column prop="city" label="得分" />
						<el-table-column prop="address" label="等级" />
					</el-table-column>
					<el-table-column label="1分钟跳绳" align="center">
						<el-table-column prop="state" label="成绩" />
						<el-table-column prop="city" label="得分" />
						<el-table-column prop="address" label="等级" />
					</el-table-column>
					<el-table-column fixed="right" prop="date" label="班级" width="150" />
				</el-table>
				<p class="tip-text">注：“——”代表暂无该项体测项目，“/”代表此项体测项目为参加测试。</p>
			</div>
			<TiCeChart></TiCeChart>
		</div>
	</div>
</template>

<script setup>
	import TiCeChart from './TiCeChart.vue'
	const tableData = ref([{
		date: '2016-05-03',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'Los Angeles',
		zip: 'CA 90036',
	}, {
		date: '2016-05-03',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'Los Angeles',
		zip: 'CA 90036',
	}])
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
