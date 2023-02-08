<template>
	<div>
		<div class="ty-box" style="display: flex;">
			<el-row style="width: 80%;">
				<el-col :span="6">
					<div class="text-lr">
						<span>姓名</span>
						<span class="value">{{studentInfo.name}}</span>
					</div>
					<div class="text-lr">
						<span>班级</span>
						<span class="value">{{studentInfo.class_name}}</span>
					</div>
					<div class="text-lr">
						<span>学校</span>
						<span class="value">{{studentInfo.school_name}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>性别</span>
						<span class="value">{{studentInfo.gender}}</span>
					</div>
					<div class="text-lr">
						<span>学级</span>
						<span class="value">{{studentInfo.year}}</span>
					</div>
					<div class="text-lr">
						<span>片区</span>
						<span class="value">{{studentInfo.area}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>年龄</span>
						<span class="value">{{studentInfo.age}}</span>
					</div>
					<div class="text-lr">
						<span>年级</span>
						<span class="value">{{studentInfo.grade_name}}</span>
					</div>
					<div class="text-lr">
						<span>集团</span>
						<span class="value">{{studentInfo.edu_group}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="text-lr">
						<span>学号</span>
						<span class="value">{{studentInfo.student_ID}}</span>
					</div>
					<div class="text-lr">
						<span>老师</span>
						<span class="value">
							<span v-for="item in studentInfo.teachers">{{item.name}}，</span>
						</span>
					</div>
					<div class="text-lr">
						<span>教委</span>
						<span class="value">{{studentInfo.edu_commission}}</span>
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
				<h3 class="title" style="margin-bottom: 0;">学生各项体测指记录</h3>
				<div class="al-flex" style="align-items: center;">
					<p style="color: #222426;">体测计划</p>
					<el-select v-model="planParams.plan_start_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option v-for="plan in planOpt" :label="plan.name" :value="plan.id" />
					</el-select>
					<span style="width: 25px;height: 1px;background: #979797;"></span>
					<el-select v-model="planParams.plan_end_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option v-for="plan in planOpt" :label="plan.name" :value="plan.id" />
					</el-select>
					<el-button type="primary" @click="getTiCeData">查询</el-button>
				</div>
			</div>
			<div style="margin-bottom: 50px;">
				<el-table :data="tableData" style="width: 100%" :border="true">
					<!-- <el-table-column label="体测计划" width="180" align="center">
						<template #default="scope">
							<span style="margin-left: 10px">2021年第8期</span>
						</template>
					</el-table-column> -->
					<el-table-column prop="p_name" label="体测计划" width="180" align="center" />
					<el-table-column label="身高" align="center">
						<el-table-column prop="身高" label="cm" align="center" />
					</el-table-column>
					<el-table-column label="体重" align="center">
						<el-table-column prop="体重" label="kg" align="center" />
					</el-table-column>
					<el-table-column label="总分" align="center">
						<el-table-column prop="总分" label="权重" align="center" />
					</el-table-column>
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
					<el-table-column label="一分钟仰卧起坐" align="center">
						<el-table-column label="成绩" prop="一分钟仰卧起坐成绩" align="center">
							<template #default="scope">
								<p v-if="scope.row['一分钟仰卧起坐得分'] < 60" style="color: red;">{{scope.row['一分钟仰卧起坐成绩']}}</p>
								<p v-else>{{scope.row['一分钟仰卧起坐成绩']}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="一分钟仰卧起坐得分" label="得分" />
						<el-table-column prop="一分钟仰卧起坐等级" label="等级" />
					</el-table-column>
					<el-table-column label="50*8往返跑" align="center">
						<el-table-column label="成绩" prop="50*8往返跑成绩" align="center">
							<template #default="scope">
								<p v-if="scope.row['50*8往返跑得分'] < 60" style="color: red;">{{scope.row['50*8往返跑成绩']}}</p>
								<p v-else>{{scope.row['50*8往返跑成绩']}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="50*8往返跑得分" label="得分" />
						<el-table-column prop="50*8往返跑等级" label="等级" />
					</el-table-column>
					<el-table-column fixed="right" label="班级" width="150" align="center">
						<template #default="scope">
							<span>{{studentInfo.grade_name+studentInfo.class_name}}</span>
						</template>
					</el-table-column>
					<!-- <el-table-column fixed="right" prop="date" label="班级" width="150" /> -->
				</el-table>
				<p class="tip-text">注：“——”代表暂无该项体测项目，“/”代表此项体测项目未参加测试。</p>
			</div>
			<TiCeChart :student-id="studentId" :chart-data="chartData"></TiCeChart>
			<p style="margin-bottom: 40px;"></p>
			<a class="download-a" :href="downloadUrl" download target="_blank">下载</a>
		</div>
	</div>
</template>

<script setup>
	import {getStudentInfo,getStudentData,getStuPlanOpt} from '@/api/base'
	import qs from 'qs'
	import { useRoute } from 'vue-router';
	import TiCeChart from './TiCeChart.vue'
	const route = useRoute()
	const downloadUrl = ref('')
	const studentId = ref('')
	const studentInfo = ref({})
	const planParams = ref({
		plan_start_id:'',
		plan_end_id:''
	})
	const planOpt = ref([])
	const tableData = ref([])
	const chartData = ref({})
	onMounted(()=>{
		studentId.value = route.query.id
		if(!studentId.value) return
		getStudentInfo({id:studentId.value}).then(res=>{
			console.log(res)
			studentInfo.value = res
		})
		getStuPlanOpt({student_id:studentId.value}).then(res=>{
			planOpt.value=res
		})
		getTiCeData()
	})
	//获取学生体测数据
	const getTiCeData = ()=>{
		let params = {
			student_id:studentId.value
		}
		if(planParams.value.plan_start_id && planParams.value.plan_end_id){
			params.plan_start_id=planParams.value.plan_start_id
			params.plan_end_id=planParams.value.plan_end_id
		}
		downloadUrl.value = import.meta.env.VITE_API_HOST+'/score/student_score/?'+qs.stringify(params)
		downloadUrl.value += '&download=1&token='+localStorage.getItem('token')
		getStudentData(params).then(res=>{
			// console.log(res)
			tableData.value = res.score_list
			chartData.value = res.chart_data
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
	.tip-text{
		font-size: 14px;
		color: #979797;
		margin: 30px 30px;
	}
</style>
