<template>
	<div class="al-flex-between">
		<!-- <h3 class="title" style="margin-bottom: 0;">本校各项体测指标记录</h3> -->
		<h3 class="title" style="margin-bottom: 0;">各项体测指标均值分析</h3>
		<div class="al-flex" style="align-items: center;">
			<p style="color: #222426;">体测计划</p>
			<el-select v-model="planParams.plan_start_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
				<el-option v-for="plan in homeData.plan_data" :label="plan.name" :value="plan.id" />
			</el-select>
			<span style="width: 25px;height: 1px;background: #979797;"></span>
			<el-select v-model="planParams.plan_end_id" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
				<el-option v-for="plan in homeData.plan_data" :label="plan.name" :value="plan.id" />
			</el-select>
			<el-button type="primary" @click="getTiCeData">查询</el-button>
		</div>
	</div>
	<!-- <h3 class="title">各项体测指标等级分析</h3> -->
	<div id='gradeChat' style="height: 300px;margin: 30px 0;"></div>
	<h3 class="title">本校各项体测指标等级分析</h3>
	<div style="margin: 30px 0;">
		<ul class="ty-tab">
			<li :class="{'active':tabIndex===index}" v-for="(tab,index) in projects" @click="tabClick(index,tab.id)">{{tab.name}}</li>
		</ul>
	</div>
	<div id='barChat' style="height: 300px;"></div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	import {getProjectChat,getGradeChart} from '@/api/home'
	const props = defineProps(['homeData','userType'])
	import {useRoute} from 'vue-router';
	const route = useRoute()
	const projects = ref([])
	const schoolId = ref('')
	const homeData = ref({})
	const planParams = ref({
		plan_start_id:'',
		plan_end_id:''
	})
	const tabs = ref([
		{id:1,name:'体重指数'},
	])
	watch(props,(n,o)=>{
		homeData.value = n.homeData
		projects.value =n.homeData.projects
		console.log(n.homeData,'监听')
	})
	// const tabs = ref(props.homeData.projects.小学)
	const tabIndex = ref(0)
	const tabClick = (index,id)=>{
		tabIndex.value = index
		project_id.value=id
		getTiCeData()
	}
	const project_id = ref('')
	const gradeChat = ref(null)
	const barChat = ref(null)
	const gradeChatOption = ref(null)
	const option = ref(null)
	const gTabIndex = ref(0)
	const gTabClick = (index)=>{
		gTabIndex.value = index
	}
	onMounted(() => {
		schoolId.value = route.query.id
		getTiCeData()
		barChat.value = echarts.init(document.getElementById("barChat"));
		gradeChat.value = echarts.init(document.getElementById("gradeChat"));
		option.value = {
			legend: {},
			tooltip: {},
			dataset: {
				source: [
					['product', '正常', '超体重', '超重', '肥胖'],
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
				data: ['体重指数', '肺活量', '50米跑']
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
				data: ['2022年第1期', '2022年第2期', '2022年第3期', '2022年第4期', '2022年第5期']
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
		gradeChat.value.setOption(gradeChatOption.value);
		window.onresize = function() {
			barChat.value.resize();
			gradeChat.value.resize();
		};
	})
	const getTiCeData = ()=>{
		let params = {
			school_id:schoolId.value,
			project_id:project_id.value || 3,
			plan_start_id:planParams.value.plan_start_id || 3,
			plan_end_id:planParams.value.plan_end_id || 6
		}
		getProjectChat(params).then(res=>{
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
			option.value.dataset.source = res.source
			option.value.series = series
			barChat.value.setOption(option.value);
		})
		//线图
		getGradeChart(params).then(res=>{
			// console.log(res)
			gradeChatOption.value.legend.data = res.legendData
			gradeChatOption.value.series = res.series
			gradeChatOption.value.xAxis.data = res.yAxisData
			gradeChat.value.setOption(gradeChatOption.value);
		})
	}
</script>

<style lang="scss">
	
</style>
