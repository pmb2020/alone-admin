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
				<div class="tab-item" :class="{'active':tabIndex==0}" @click="daTabCLick(0)">
					年级体测数据展示及分析
				</div>
				<div class="tab-item" :class="{'active':tabIndex==1}" @click="daTabCLick(1)">
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
						<el-table-column prop="class_name" label="班级" align="center" />
						<el-table-column prop="总分" label="总分(权重)" align="center" />
						<el-table-column label="体重指数(BMI)" align="center">
							<el-table-column label="成绩" prop="体重指数（BMI）成绩" align="center">
								<template #default="scope">
									<p v-if="scope.row['体重指数（BMI）得分'] < 60" style="color: red;">{{scope.row['体重指数（BMI）得分']}}</p>
									<p v-else>{{scope.row['体重指数（BMI）成绩']}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="体重指数（BMI）得分" label="得分" align="center" />
							<el-table-column prop="体重指数（BMI）等级" label="等级" align="center" />
						</el-table-column>
						<el-table-column label="肺活量" align="center">
							<el-table-column label="成绩" prop="肺活量成绩" align="center">
								<template #default="scope">
									<p v-if="scope.row['肺活量得分'] < 60" style="color: red;">{{scope.row['肺活量成绩']}}</p>
									<p v-else>{{scope.row['肺活量成绩']}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="肺活量得分" label="得分" align="center" />
							<el-table-column prop="肺活量等级" label="等级" align="center" />
						</el-table-column>
						<el-table-column label="50m跑" align="center">
							<el-table-column label="成绩" prop="50米跑成绩" align="center">
								<template #default="scope">
									<p v-if="scope.row['50米跑得分'] < 60" style="color: red;">{{scope.row['50米跑成绩']}}</p>
									<p v-else>{{scope.row['50米跑成绩']}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="50米跑得分" label="得分" align="center" />
							<el-table-column prop="50米跑等级" label="等级" align="center" />
						</el-table-column>
						<el-table-column label="坐位体前屈" align="center">
							<el-table-column label="成绩" prop="坐位体前屈成绩" align="center">
								<template #default="scope">
									<p v-if="scope.row['坐位体前屈得分'] < 60" style="color: red;">{{scope.row['坐位体前屈成绩']}}</p>
									<p v-else>{{scope.row['坐位体前屈成绩']}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="坐位体前屈得分" label="得分" align="center" />
							<el-table-column prop="坐位体前屈等级" label="等级" align="center" />
						</el-table-column>
						<el-table-column label="1分钟跳绳" align="center">
							<el-table-column label="成绩" prop="一分钟跳绳成绩" align="center">
								<template #default="scope">
									<p v-if="scope.row['一分钟跳绳得分'] < 60" style="color: red;">{{scope.row['一分钟跳绳成绩']}}</p>
									<p v-else>{{scope.row['一分钟跳绳成绩']}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="一分钟跳绳得分" label="得分" align="center" />
							<el-table-column prop="一分钟跳绳等级" label="等级" align="center" />
						</el-table-column>
						<!-- <el-table-column fixed="right" prop="date" label="班级" width="150" /> -->
					</el-table>
					<div style="display:flex;justify-content: space-between;align-items: center;margin-top: 20px;">
						<p class="tip-text" style="margin: 0;">注：“——”代表暂无该项体测项目，“/”代表此项体测项目未参加测试。</p>
						<div style="display: flex;justify-content: end;">
							<el-pagination small :current-page="page" :page-size="pageSize" :background="true"
								:page-sizes="[20,50, 100, 300, 500]" layout="prev, pager, next,sizes, jumper" :total="total"
								@size-change="handleSizeChange" @current-change="handleCurrentChange" />
						</div>
					</div>
					<!-- <p class="tip-text">注：“——”代表暂无该项体测项目，“/”代表此项体测项目未参加测试。</p> -->
				</div>
				<TiCeChart @project-chage="projectChage" :class-id="gradeId" :grade-id="gradeId" :plan-query="planQuery" :projects="projects">
				</TiCeChart>
				<!-- 本年级各班总体等级对比分析 -->
				<TiCeChart3 :data="bingData.all_class_grade" />
				<a class="download-a" :href="downloadUrl" download target="_blank">下载</a>
			</div>
			<div v-else>
				<TiCeChart2 :grade-id="gradeId" :plan-query="planQuery" :ticePlanOption="gradeInfo.plan_data" :projects="projects"></TiCeChart2>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		getGradeInfo,
		getGradeTable,getGradeProjectD
	} from '@/api/base'
	import {
		useRoute
	} from 'vue-router';
	import TiCeChart from './TiCeChart.vue'
	import TiCeChart2 from './TiCeChart2.vue'
	import TiCeChart3 from './TiCeChart3.vue'
	import qs from 'qs'
	const downloadUrl = ref('')
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const route = useRoute()
	const gradeId = ref('')
	const gradeInfo = ref({
		grade_info: {}
	})
	const bingData = ref({
		all_class_grade:{},
		score_grade_chart:{},
		score_grade_chart_boy:{},
		score_grade_chart_girl:{}
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
	const daTabCLick = (index)=>{
		tabIndex.value = index
		if(index==0){
			getTiCeData()
		}
	}
	const projectChage = (id)=>{
		// console.log('我是一个测试'+id)
		planQuery.value.grade_id = gradeId.value
		planQuery.value.project_id = id
		getGradeProjectD(planQuery.value).then(res=>{
			// console.log(res)
			bingData.value = res
		})
	}
	const getTiCeData = () => {
		planQuery.value.grade_id = gradeId.value
		console.log(planQuery.value)
		getGradeInfo(planQuery.value).then(res => {
			// console.log(res)
			gradeInfo.value = res
		})
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getGradeTable({...params,...planQuery.value}).then(res => {
			// console.log(res)
			projects.value = res.projects
			tableData.value = res.score_list
			total.value = res.total
		})
		downloadUrl.value = import.meta.env.VITE_API_HOST+'/score/grade_project_grade/?'+qs.stringify(planQuery.value)
		downloadUrl.value += '&download=1&token='+localStorage.getItem('token')
		//饼图数据
		getGradeProjectD(planQuery.value).then(res=>{
			console.log(res)
			bingData.value = res
		})
	}
	const handleCurrentChange = (number) => {
		page.value = number
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getGradeTable({...params,...planQuery.value}).then(res => {
			tableData.value = res.score_list
			total.value = res.total
		})
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getGradeTable({...params,...planQuery.value}).then(res => {
			tableData.value = res.score_list
			total.value = res.total
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
