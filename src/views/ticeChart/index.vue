<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item v-if="userType=='edu'" label="学校">
									<el-select v-model="queryForm.school_id" placeholder="请选择">
										<el-option v-for="item in queryOption.schools" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
								<el-form-item label="学级">
									<el-select v-model="queryForm.year" placeholder="请选择">
										<el-option v-for="item in queryOption.years" :label="item" :value="item" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item v-if="userType=='edu'" label="学段">
									<el-select v-model="queryForm.grade_type" placeholder="请选择">
										<el-option label="小学" value="小学" />
										<el-option label="初中" value="初中" />
										<el-option label="高中" value="高中" />
									</el-select>
								</el-form-item>
								<el-form-item label="年级">
									<el-select v-model="queryForm.grade_id" placeholder="请选择">
										<el-option v-for="item in queryOption.grades" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item v-if="userType=='edu'" label="集团">
									<el-select v-model="queryForm.edu_group" placeholder="请选择">
										<el-option v-for="item in queryOption.edu_groups" :label="item.edu_group" :value="item.edu_group" />
									</el-select>
								</el-form-item>
								<el-form-item label="班级">
									<el-select v-model="queryForm.class_id" placeholder="请选择">
										<el-option v-for="item in queryOption.classes" :label="item" :value="item" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item v-if="userType=='edu'" label="片区">
									<el-select v-model="queryForm.area" placeholder="请选择">
										<el-option v-for="item in queryOption.areas" :label="item.area" :value="item.area" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding-bottom: 18px;">
						<div
							style="display: flex;align-items: center;justify-content: end;flex-direction: column;height: 100%;">
							<el-button type="primary" style="margin-left: 0;" @click="getListData">查询</el-button>
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
					<el-select v-model="queryForm.plan_start_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option v-for="plan in queryOption.plans" :label="plan.name" :value="plan.id" />
					</el-select>
					<span style="width: 25px;height: 1px;background: #979797;"></span>
					<el-select v-model="queryForm.plan_end_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option v-for="plan in queryOption.plans" :label="plan.name" :value="plan.id" />
					</el-select>
					<!-- <el-select v-model="planQuery.plan_id" style="width: 100px;margin: 0 10px;" placeholder="请选择">
						<el-option v-for="(item,index) in ticePlanOption" :label="item.name" :value="item.id" />
					</el-select> -->
					<p style="color: #222426;">性别</p>
					<el-select v-model="queryForm.gender" class="m-2" style="width: 100px;margin: 0 10px;"
						placeholder="请选择">
						<el-option label="全部" value="全部" />
						<el-option label="男" value="男" />
						<el-option label="女" value="女" />
					</el-select>
					<el-button type="primary" @click="getListData">查询</el-button>
				</div>
			</div>
			<div style="margin: 30px 0;">
				<ul class="ty-tab" style="flex-wrap: wrap;">
					<li style="margin-bottom: 15px;" :class="{'active':tabIndex===index}" v-for="(tab,index) in queryOption.projects" @click="tabClick(index,tab.id)">{{tab.name}}</li>
				</ul>
			</div>
			<!-- <TiCeChart2 :class-id="queryForm.class_id"></TiCeChart2> -->
			<h3 class="title">得分数据分析</h3>
			<div id='gradeChat' style="height: 300px;"></div>
			<h3 class="title" style="margin-top:20px">等级数据分析</h3>
			<div id='barChat' style="height: 300px;"></div>
			<a class="download-a" :href="downloadUrl" download target="_blank">下载</a>
		</div>
	</div>
</template>

<script setup>
	import {getBaseOpt,getBaseChart} from '@/api/ticeChart'
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
		plan_start_id:'',
		plan_end_id:'',
		gender:'全部'
	})
	const userType = ref(localStorage.getItem('usertype')) 
	const barData = ref(null)
	const gradeData = ref(null)
	const chartParams = ref({})
	const tabIndex = ref(0)
	const projectId = ref('')
	const downloadUrl = ref('')
	const option = ref({})
	const barChat = ref(null)
	const gradeChat = ref(null)
	const gradeChatOption = ref({})
	const tabClick = (index,id)=>{
		tabIndex.value = index
		projectId.value = id
		getListData()
	}
	import echarts from '@/utils/echarts.js'
	onMounted(() => {
		// ElMessage.warning('请先选择班级！')
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
		getBaseOpt().then(res=>{
			projectId.value = res.projects[0].id
			queryOption.value = res
			getListData()
		})
	}
	const getListData = ()=>{
		queryForm.project_id = projectId.value
		downloadUrl.value = import.meta.env.VITE_API_HOST+'/score/project_analysis_chart/?'+objToUrl(queryForm)
		downloadUrl.value += '&download=1&token='+localStorage.getItem('token')
		getBaseChart(queryForm).then(res=>{
			console.log(res)
			//得分数据分析,折线图
			gradeChatOption.value.legend.data = res.avg_score_chart.legendData
			gradeChatOption.value.series = res.avg_score_chart.series
			gradeChatOption.value.xAxis.data = res.avg_score_chart.yAxisData
			gradeChat.value.setOption(gradeChatOption.value);
			//等级数据分析，柱状图
			let series = [{
				type: 'bar',
				name: res.grade_chart[0][1]
			}, {
				type: 'bar',
				name: res.grade_chart[0][2]
			}, {
				type: 'bar',
				name: res.grade_chart[0][3]
			}, {
				type: 'bar',
				name: res.grade_chart[0][4]
			}]
			option.value.dataset.source = res.grade_chart
			option.value.series = series
			barChat.value.setOption(option.value);
		})
	}
	const download = ()=>{
		queryForm.project_id = projectId.value
		queryForm.download = 1
		getBaseChart(queryForm).then(res=>{
			
		})
	}
	//序列化
	const objToUrl = obj => {
	    let arr = [];
	    for(let i in obj){
	        if (obj.hasOwnProperty(i)) {
	            arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
	        }
	    }
	    return arr.join("&");
	}
</script>

<style>
	.download-a{
		color: #fff;
		float: right;
		background-color: #005EFF;
		font-size: 14px;
		border-radius: 4px;
		position: relative;
		padding: 5px 10px;
		top: -30px;
	}
</style>