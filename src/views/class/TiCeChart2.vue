<template>
	<div>
		<div class="al-flex-between" style="margin-bottom: 20px;">
			<h3 class="title" style="margin-bottom: 0;">班级体测数据展示及分析</h3>
			<div class="al-flex" style="align-items: center;">
				<p style="color: #222426;">体测计划</p>
				<el-select v-model="queryParams.plan_id" style="width: 100px;margin: 0 10px;" placeholder="请选择">
					<el-option v-for="(item,index) in ticePlanOption" :label="item.name" :value="item.id" />
				</el-select>
				<p style="color: #222426;">性别</p>
				<el-select v-model="queryParams.gender" class="m-2" style="width: 100px;margin: 0 10px;"
					placeholder="请选择">
					<el-option label="全部" value="全部" />
					<el-option label="男" value="男" />
					<el-option label="女" value="女" />
				</el-select>
				<el-button type="primary" @click="getCalssData">查询</el-button>
			</div>
		</div>
		<div id='gradeChat' style="height: 300px;"></div>
		<h3 class="title">各项体测指标等级分析</h3>
		<div style="margin: 30px 0;">
			<ul class="ty-tab">
				<li :class="{'active':tabIndex===index}" v-for="(tab,index) in projects" @click="tabClick(index)">
					{{tab.name}}</li>
			</ul>
		</div>
		<div id='barChat' style="height: 300px;"></div>
	</div>
</template>

<script setup>
	import {getClassPeriodAvg,getClassPeriod} from '@/api/base'
	import echarts from '@/utils/echarts.js'
	const props = defineProps(['classId','planQuery','projects','ticePlanOption'])
	const queryParams = reactive({
		user: '',
		region: '',
	})
	const tabs = ref([{
			id: 1,
			name: '体重指数'
		}
	])
	const tabIndex = ref(0)
	const barData = ref(null)
	const gradeData = ref(null)
	watch(props,(n,o)=>{
		console.log(n)
		classId.value = n.classId
		planQuery.value = n.planQuery
		initData()
	})
	const tabClick = (index) => {
		tabIndex.value = index
	}
	
	onMounted(() => {
		initData()
		let barChat = echarts.init(document.getElementById("barChat"));
		let gradeChat = echarts.init(document.getElementById("gradeChat"));
		const option = {
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
		const gradeChatOption = {
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
		setTimeout(()=>{
			gradeChatOption.legend.data = gradeData.legendData
			gradeChatOption.series = gradeData.series
			gradeChatOption.xAxis.data = gradeData.value.yAxisData
			// console.log(gradeChatOption.xAxis.data)
			// console.log(gradeData.value)
			gradeChat.setOption(gradeChatOption);
			
			option.dataset.source = barData.value.source
			barChat.setOption(option);
		},1000)
		
		window.onresize = function() {
			barChat.resize();
			gradeChat.resize();
		};
	})
	
	const initData = ()=>{
		getCalssData()
	}
	
	const getCalssData = ()=>{
		let params = {class_id:props.classId}
		getClassPeriodAvg(params).then(res=>{
			// console.log(res)
			gradeData.value = res
		})
		getClassPeriod(params).then(res=>{
			console.log(res)
			barData.value = res
		})
	}
</script>

<style>
</style>
