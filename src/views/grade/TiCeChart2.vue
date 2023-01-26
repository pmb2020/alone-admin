<template>
	<div>
		<div class="al-flex-between" style="margin-bottom: 20px;">
			<h3 class="title" style="margin-bottom: 0;">各项体测指标均值分析</h3>
			<div class="al-flex" style="align-items: center;">
				<p style="color: #222426;">体测计划</p>
				<el-select v-model="planParams.plan_start_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
					<el-option v-for="plan in ticePlanOption" :label="plan.name" :value="plan.id" />
				</el-select>
				<span style="width: 25px;height: 1px;background: #979797;"></span>
				<el-select v-model="planParams.plan_end_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
					<el-option v-for="plan in ticePlanOption" :label="plan.name" :value="plan.id" />
				</el-select>
				<p style="color: #222426;">性别</p>
				<el-select v-model="planParams.gender" class="m-2" style="width: 100px;margin: 0 10px;"
					placeholder="请选择">
					<el-option label="全部" value="全部" />
					<el-option label="男" value="男" />
					<el-option label="女" value="女" />
				</el-select>
				<el-button type="primary" @click="getTiCeData">查询</el-button>
			</div>
		</div>
		<div id='gradeChat' style="height: 300px;"></div>
		<h3 class="title">各项体测指标等级分析</h3>
		<div style="margin: 30px 0;">
			<ul class="ty-tab">
				<li :class="{'active':tabIndex===index}" v-for="(tab,index) in projects" @click="tabClick(index,tab.id)">
					{{tab.name}}</li>
			</ul>
		</div>
		<div id='barChat' style="height: 300px;"></div>
	</div>
</template>

<script setup>
	import {getGradePeriodAvg,getGradePeriod} from '@/api/base'
	import echarts from '@/utils/echarts.js'
	const props = defineProps(['classId','gradeId','planQuery','projects','ticePlanOption'])
	const planParams = ref({
		plan_start_id:'',
		plan_end_id:'',
		gender:'全部'
	})
	const tabs = ref([{
			id: 1,
			name: '体重指数'
		}
	])
	const tabIndex = ref(0)
	const barData = ref(null)
	const gradeData = ref(null)
	const barChat = ref(null)
	const gradeChat = ref(null)
	const option = ref({})
	const gradeChatOption = ref({})
	watch(props,(n,o)=>{
		console.log(n)
		gradeId.value = n.gradeId
		planQuery.value = n.planQuery
		// getTiCeData()
	})
	const tabClick = (index,id) => {
		tabIndex.value = index
		planParams.value.project_id = id
		adClassPeriod()
	}
	
	onMounted(() => {
		getTiCeData()
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
					['2022年第3期', 72.4, 53.9, 39.1, 19.2],
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
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['体重指数']
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
				data: ['2021年第8期', '2022年第2期', '2022年第3期', '2022年第5期']
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
				}
			]
		};
		window.onresize = function() {
			barChat.value.resize();
			gradeChat.value.resize();
		};
	})
	
	const initData = ()=>{
		getTiCeData()
	}
	const getTiCeData = ()=>{
		planParams.value.grade_id = props.gradeId
		//均值折线
		getGradePeriodAvg(planParams.value).then(res=>{
			// console.log(res)
			// gradeData.value = res
			gradeChatOption.value.legend.data = res.legendData
			gradeChatOption.value.series = res.series
			gradeChatOption.value.xAxis.data = res.yAxisData
			gradeChat.value.setOption(gradeChatOption.value);
		})
		adClassPeriod()
	}
	//等级分析柱状图
	const adClassPeriod = ()=>{
		planParams.value.class_id = props.gradeId
		if(!planParams.value.project_id){
			planParams.value.project_id = props.projects[0].id
		}
		// console.log(planParams.value)
		getGradePeriod(planParams.value).then(res=>{
			let series = [{
				type: 'bar',
				name: res.source[0][1]
			}, {
				type: 'bar',
				name: res.source[0][2]
			}, {
				type: 'bar',
				name: res.source[0][3]
			}, {
				type: 'bar',
				name: res.source[0][4]
			}]
			option.value.series = series
			option.value.dataset.source = res.source
			barChat.value.setOption(option.value);
		})
	}
</script>

<style>
</style>
