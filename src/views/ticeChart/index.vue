<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="学校">
									<el-select v-model="queryForm.school_id" placeholder="请选择" @change="selSchool">
										<el-option v-for="item in queryOption.school" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
								<el-form-item label="学级">
									<el-select v-model="queryForm.year" placeholder="请选择" @change="selYear">
										<el-option v-for="item in queryOption.year" :label="item" :value="item" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="片区">
									<el-input v-model="queryForm.area" placeholder="请输入内容" />
								</el-form-item>
								<el-form-item label="年级">
									<el-select v-model="queryForm.grade_id" placeholder="请选择" @change="selGrade">
										<el-option v-for="item in queryOption.grade" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="集团">
									<el-input v-model="queryForm.edu_group" placeholder="请输入内容" />
								</el-form-item>
								<el-form-item label="班级">
									<el-select v-model="queryForm.class_id" placeholder="请选择" @change="selClass">
										<el-option v-for="item in queryOption.class" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding-bottom: 18px;">
						<div
							style="display: flex;align-items: center;justify-content: end;flex-direction: column;height: 100%;">
							<el-button type="primary" style="margin-left: 0;" @click="getData">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between" style="margin-bottom: 20px;">
				<h3 class="title" style="margin-bottom: 0;">班级数据分析</h3>
				<div class="al-flex" style="align-items: center;">
					<!-- <p style="color: #222426;">体测计划</p> -->
					<p style="color: #222426;">体测计划</p>
					<el-select v-model="planQuery.plan_id" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option v-for="(item,index) in ticePlanOption" :label="item.name" :value="item.id" />
					</el-select>
					<p style="color: #222426;">性别</p>
					<el-select v-model="planQuery.gender" class="m-2" style="width: 100px;margin: 0 10px;"
						placeholder="请选择">
						<el-option label="全部" value="全部" />
						<el-option label="男" value="男" />
						<el-option label="女" value="女" />
					</el-select>
					<el-button type="primary" @click="getData">查询</el-button>
				</div>
			</div>
			<div style="margin: 30px 0;">
				<ul class="ty-tab">
					<li :class="{'active':tabIndex===index}" v-for="(tab,index) in projects" @click="tabClick(index)">{{tab.name}}</li>
				</ul>
			</div>
			<!-- <TiCeChart2 :class-id="queryForm.class_id"></TiCeChart2> -->
			<h3 class="title">得分数据分析</h3>
			<div id='gradeChat' style="height: 300px;"></div>
			<h3 class="title" style="margin-top:20px">等级数据分析</h3>
			<div id='barChat' style="height: 300px;"></div>
			
		</div>
	</div>
</template>

<script setup>
	import {getSchoolOpt,getYearOpt,getGradeOpt,getClassOpt} from '@/api/ticeChart'
	import {getClassInfo,getClassTCPlan,getClassData} from '@/api/base'
	import {getClassPeriodAvg,getClassPeriod} from '@/api/base'
	import TiCeChart2 from "./TiCeChart2.vue"
	const queryOption = ref({
		school:[],
		year:[]
	}) 
	const classId = ref('')
	const classInfo = ref({
		class_detail: {}
	})
	const projects = ref([{id:1,name:'体重指数'}])
	const ticePlanOption = ref([])
	const planQuery = ref({
		plan_id: '',
		gender: ''
	})
	const queryForm = reactive({
		school_id: '',
		year: '',
	})
	const barData = ref(null)
	const gradeData = ref(null)
	const chartParams = ref({})
	const tabIndex = ref(0)
	const option = ref({})
	const barChat = ref(null)
	const gradeChat = ref(null)
	const gradeChatOption = ref({})
	const tabClick = (index)=>{
		tabIndex.value = index
	}
	import echarts from '@/utils/echarts.js'
	onMounted(() => {
		ElMessage.warning('请先选择班级！')
		initData()
		barChat.value = echarts.init(document.getElementById("barChat"));
		gradeChat.value = echarts.init(document.getElementById("gradeChat"));
		option.value = {
			legend: {},
			tooltip: {},
			dataset: {
				source: [
					['product', '正常', '超体重', '超重', '肥胖'],
					['2021年第6期', 43.3, 85.8, 93.7, 27],
					['2022年第1期', 83.1, 73.4, 55.1, 22.2],
					['2022年第2期', 86.4, 65.2, 82.5, 35.1],
					['2022年第3期', 72.4, 53.9, 39.1, 19.2],
					['2022年第4期', 32.4, 17.9, 122.1, 12.4],
					['2022年第5期', 32.4, 17.9, 122.1, 12.4],
				]
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {
				type: "value",
				name: "人数",
				nameTextStyle: {
					color: "#aaa",
					nameLocation: "start",
					align: "right",
				},
			},
			series: [{
				type: 'bar'
			}, {
				type: 'bar'
			}, {
				type: 'bar'
			}, {
				type: 'bar'
			}]
		};
		gradeChatOption.value = {
			title: {
				subtext: '得分',
				left: 30, // 距离左边位置
				top: 15, // 距离上面位置
				subtextStyle: { // 设置二级标题的样式
					color: "#baf"
				}
			},
			tooltip: {},
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
		// barChat.value.setOption(option.value);
		// gradeChat.value.setOption(gradeChatOption.value);
		window.onresize = function() {
			barChat.value.resize();
			gradeChat.value.resize();
		};
	})
	const initData = ()=>{
		getSchoolOpt().then(res=>{
			queryOption.value.school = res
		})
	}
	
	const getData = ()=>{
		getClassTCPlan({
			class_id: queryForm.class_id
		}).then(res => {
			ticePlanOption.value = res
		})
		getClassData({class_id:queryForm.class_id}).then(res=>{
			console.log(res)
			projects.value = res.projects
		})
		getCalssData()
	}
	const getCalssData = ()=>{
		let params = {class_id:queryForm.class_id}
		getClassPeriodAvg(params).then(res=>{
			console.log(res)
			gradeData.value = res
			gradeChatOption.value.legend.data = gradeData.legendData
			gradeChatOption.value.series = gradeData.series
			gradeChatOption.value.xAxis.data = gradeData.value.yAxisData
			gradeChat.value.setOption(gradeChatOption.value);
		})
		getClassPeriod(params).then(res=>{
			console.log(res)
			option.value.dataset.source = res.source
			barChat.value.setOption(option.value);
		})
	}
	const selSchool = (school_id)=>{
		queryForm.year = null
		queryForm.grade_id = null
		queryForm.class_id = null
		queryOption.value.school.forEach(item=>{
			if(item.id===school_id){
				queryForm.area = item.area
				queryForm.edu_group = item.edu_group
			}
		})
		getYearOpt({school_id:school_id}).then(res=>{
			queryOption.value.year = res
		})
	}
	
	const selYear = (year)=>{
		queryForm.grade_id = null
		queryForm.class_id = null
		getGradeOpt({
			school_id:queryForm.school_id,
			year:queryForm.year,
		}).then(res=>{
			queryOption.value.grade = res
		})
	}
	const selGrade = (grade_id)=>{
		queryForm.class_id = null
		getClassOpt({
			school_id:queryForm.school_id,
			year:queryForm.year,
			grade_id:queryForm.grade_id
		}).then(res=>{
			queryOption.value.class = res
		})
	}
	//选择班级之后。调用班级相关图表接口
	const selClass = (class_id)=>{
		console.log(class_id)
	}
</script>

<style>
</style>