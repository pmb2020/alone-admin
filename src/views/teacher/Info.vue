<template>
	<div>
		<div class="ty-box" style="display: flex;">
			<el-row style="width: 80%;">
				<el-col :span="6">
					<div class="text-lr">
						<span>老师姓名</span>
						<span class="value">{{teaInfo.name}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>工龄</span>
						<span class="value">{{teaInfo.name}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>职务</span>
						<span class="value">{{teaInfo.job_title}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>教师ID</span>
						<span class="value">{{teaInfo.id}}</span>
					</div>
				</el-col>
				<el-col :span="24">
					<div class="text-lr">
						<span>所带班级</span>
						<span class="value">
							<span v-for="item in teaInfo.grades">{{item.year}}级{{item.name}}，</span>
						</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="ty-box">
			<!-- <h3 class="title">学生体测数据展示</h3> -->
			<div class="al-flex-between" style="margin-bottom: 20px;">
				<h3 class="title" style="margin-bottom: 0;">各项体测指标均值分析</h3>
				<div class="al-flex" style="align-items: center;">
					<p style="color: #222426;">体测计划</p>
					<el-select v-model="queryParams" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<!-- <el-option label="2021年7期" value="item.value" />
						<el-option label="2021年8期" value="item.value" /> -->
					</el-select>
					<span style="width: 25px;height: 1px;background: #979797;"></span>
					<el-select v-model="queryParams" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<!-- <el-option label="2021年7期" value="item.value" />
						<el-option label="2021年8期" value="item.value" /> -->
					</el-select>
					<el-button type="primary">查询</el-button>
				</div>
			</div>
			<TiCeChart></TiCeChart>
		</div>
	</div>
</template>

<script setup>
	import {getTeaInfo} from '@/api/base'
	import TiCeChart from './TiCeChart.vue'
	import { useRoute } from 'vue-router';
	const route = useRoute()
	const teaInfo = ref({})
	const id = ref('')
	const queryParams = ref({})
	onMounted(()=>{
		id.value = route.query.id
		if(!id.value) return
		getTeaInfo({teacher_id:id.value}).then(res=>{
			console.log(res[0])
			teaInfo.value=res[0]
		})
	})
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
