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
		<!-- 全区各项体测指标分析 -->
		<div class="ty-box">
			<TiCeChart />
		</div>
		<div class="ty-box">
			<div class="al-flex-between" style="margin-bottom: 20px;">
				<h3 class="title" style="margin-bottom: 0;">全区各项体测指记录</h3>
				<ul class="ty-tab">
					<li :class="{'active':gTabIndex==0}" @click="gTabClick(0)">小学</li>
					<li :class="{'active':gTabIndex==1}" @click="gTabClick(1)">初中</li>
					<li :class="{'active':gTabIndex==2}" @click="gTabClick(2)">高中</li>
				</ul>
			</div>
			<div>
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="date" label="体测项目" />
					<el-table-column prop="name" label="姓名" width="180" />
					<el-table-column prop="name" label="成绩" />
					<el-table-column prop="name" label="得分" />
					<el-table-column prop="address" label="记录时间" />
					<el-table-column prop="address" label="所属学校" />
					<el-table-column prop="address" label="所属年级" />
				</el-table>
			</div>
		</div>
	</div>
</template>

<script setup>
	import WeightChart from './WeightChart.vue'
	import TiCeChart from './TiCeChart.vue'
	const gTabIndex = ref(0)
	const gTabClick = (index)=>{
		gTabIndex.value = index
	}
	const tableData = ref([{
			date: '2016-05-03',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-04',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-01',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
	])
</script>

<style lang="scss">
	.tx-text-num {
		color: #666;
		font-size: 14px;

		& p:first-child {
			margin-bottom: 10px;
		}

		.num {
			font-size: 18px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			margin-right: 2px;
			color: #005EFF;
		}
	}
</style>
