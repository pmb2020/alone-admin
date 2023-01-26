<template>
	<div>
		<div class="ty-box" style="display: flex;">
			<el-row style="width: 80%;">
				<el-col :span="6">
					<div class="text-lr">
						<span>学级</span>
						<span class="value">{{gradeInfo.grade_info.year}}级</span>
					</div>
					<div class="text-lr">
						<span>学校</span>
						<span class="value">{{gradeInfo.grade_info.school_name}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>年级</span>
						<span class="value">{{gradeInfo.grade_info.name}}</span>
					</div>
					<div class="text-lr">
						<span>片区</span>
						<span class="value">{{gradeInfo.grade_info.area}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>集团</span>
						<span class="value">{{gradeInfo.grade_info.edu_group}}</span>
					</div>
					<div class="text-lr">
						<span>教委</span>
						<span class="value">{{gradeInfo.grade_info.edu_commission}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>老师</span>
						<span class="value">
							<span v-for="item in gradeInfo.teachers">{{item.name}}，</span>
						</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="ty-box" style="position: relative;margin-top: 80px;">
			<div class="ty-tabs">
				<div class="tab-item" :class="{'active':tabIndex==0}" @click="tabIndex=0">
					年级体测数据展示及分析
				</div>
				<div class="tab-item" :class="{'active':tabIndex==1}" @click="tabIndex=1">
					年级体测数据阶段分析
				</div>
			</div>
			<div v-if="tabIndex==0">
				<!-- <h3 class="title">学生体测数据展示</h3> -->
				<div class="al-flex-between" style="margin-bottom: 20px;">
					<h3 class="title" style="margin-bottom: 0;">年级体测数据展示及分析</h3>
					<div class="al-flex" style="align-items: center;">
						<p style="color: #222426;">体测计划</p>
						<el-select v-model="planQuery.plan_id" style="width: 100px;margin: 0 10px;" placeholder="请选择">
							<el-option v-for="(item,index) in gradeInfo.plan_data" :label="item.name"
								:value="item.id" />
						</el-select>
						<p style="color: #222426;">性别</p>
						<el-select v-model="planQuery.gender" class="m-2" style="width: 100px;margin: 0 10px;"
							placeholder="请选择">
							<el-option label="全部" value="全部" />
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
						</el-select>
						<p style="color: #222426;">班级</p>
						<el-select v-model="planQuery.class_id" class="m-2" style="width: 100px;margin: 0 10px;"
							placeholder="请选择">
							<el-option v-for="(item,index) in gradeInfo.classes" :label="item.name" :value="item.id" />
						</el-select>
						<el-button type="primary" @click="getTiCeData">查询</el-button>
					</div>
				</div>
				<div style="margin-bottom: 50px;">
					<el-table :data="tableData" style="width: 100%" :border="true">
						<el-table-column type="index" label="序号" align="center" width="80" />
						<el-table-column prop="name" label="姓名" align="center" />
						<el-table-column prop="gender" label="性别" align="center" />
						<el-table-column prop="class" label="班级" align="center" />
						<el-table-column prop="总分" label="总分(权重)" align="center" />
						<el-table-column label="体重指数(BMI)" align="center">
							<el-table-column prop="体重指数（BMI）成绩" label="成绩" />
							<el-table-column prop="体重指数（BMI）得分" label="得分" />
							<el-table-column prop="体重指数（BMI）等级" label="等级" />
						</el-table-column>
						<el-table-column label="肺活量" align="center">
							<el-table-column prop="肺活量成绩" label="成绩" />
							<el-table-column prop="肺活量得分" label="得分" />
							<el-table-column prop="肺活量等级" label="等级" />
						</el-table-column>
						<el-table-column label="50m跑" align="center">
							<el-table-column prop="50米跑成绩" label="成绩" />
							<el-table-column prop="50米跑得分" label="得分" />
							<el-table-column prop="50米跑等级" label="等级" />
						</el-table-column>
						<el-table-column label="坐位体前屈" align="center">
							<el-table-column prop="坐位体前屈成绩" label="成绩" />
							<el-table-column prop="坐位体前屈得分" label="得分" />
							<el-table-column prop="坐位体前屈等级" label="等级" />
						</el-table-column>
						<el-table-column label="1分钟跳绳" align="center">
							<el-table-column prop="一分钟跳绳成绩" label="成绩" />
							<el-table-column prop="一分钟跳绳得分" label="得分" />
							<el-table-column prop="一分钟跳绳等级" label="等级" />
						</el-table-column>
						<el-table-column fixed="right" prop="date" label="班级" width="150" />
					</el-table>
					<p class="tip-text">注：“——”代表暂无该项体测项目，“/”代表此项体测项目为参加测试。</p>
				</div>
				<TiCeChart :class-id="gradeId" :grade-id="gradeId" :plan-query="planQuery" :projects="projects">
				</TiCeChart>
			</div>
			<div v-else>
				<TiCeChart2 :class-id="classId" :grade-id="gradeId" :plan-query="planQuery" :ticePlanOption="ticePlanOption" :projects="projects"></TiCeChart2>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		getGradeInfo,
		getGradeTable
	} from '@/api/base'
	import {
		useRoute
	} from 'vue-router';
	import TiCeChart from './TiCeChart.vue'
	import TiCeChart2 from './TiCeChart2.vue'
	const route = useRoute()
	const gradeId = ref('')
	const gradeInfo = ref({
		grade_info: {}
	})
	const tabIndex = ref(0)
	const projects = ref([])
	const planQuery = ref({
		plan_id: '',
		gender: '全部'
	})
	const tableData = ref([])
	onMounted(() => {
		gradeId.value = route.query.id
		if (!gradeId.value) return
		getTiCeData()
	})

	const getTiCeData = () => {
		planQuery.value.grade_id = gradeId.value
		console.log(planQuery.value)
		getGradeInfo(planQuery.value).then(res => {
			// console.log(res)
			gradeInfo.value = res
		})
		getGradeTable(planQuery.value).then(res => {
			console.log(res.score_list)
			projects.value = res.projects
			tableData.value = res.score_list
		})
	}
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

	.tip-text {
		font-size: 14px;
		color: #979797;
		margin: 30px 30px;
	}
</style>
