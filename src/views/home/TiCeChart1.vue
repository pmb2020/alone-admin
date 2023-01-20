<template>
	<div class="al-flex-between">
		<h3 v-if="userType=='edu'" class="title" style="margin-bottom: 0;">全区各项体测指标记录</h3>
		<h3 v-else class="title" style="margin-bottom: 0;">本校各项体测指标记录</h3>
		<!-- <ul class="ty-tab">
			<li :class="{'active':gTabIndex==0}" @click="gTabClick(0)">小学</li>
			<li :class="{'active':gTabIndex==1}" @click="gTabClick(1)">初中</li>
			<li :class="{'active':gTabIndex==2}" @click="gTabClick(2)">高中</li>
		</ul> -->
	</div>
	<!-- <div>
		<p>体测计划</p>
	</div> -->
	<div style="margin: 30px 0;">
		<ul class="ty-tab">
			<li :class="{'active':tabIndex===index}" v-for="(tab,index) in projects" @click="tabClick(index,tab.id)">{{tab.name}}</li>
		</ul>
	</div>
	<h3 class="title">各项体测指标均值分析</h3>
	<div id='barChat' style="height: 300px;"></div>
	<h3 class="title">各项体测指标等级分析</h3>
	<div id='gradeChat' style="height: 300px;"></div>
</template>

<script setup>
	import echarts from '@/utils/echarts.js'
	import {getProjectChat,getGradeChart,getProjectChatEdu,getGradeChartEdu} from '@/api/home'
	const props = defineProps(['homeData','userType'])
	const projects = ref([])
	const homeData = ref({})
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
		adProjectChat()
	}
	const project_id = ref('')
	const gradeChat = ref(null)
	const barChat = ref(null)
	const gradeChatOption = ref(null)
	const option = ref(null)
	const gTabIndex = ref(0)
	const gTabClick = (index)=>{
		gTabIndex.value = index
		// if(index==0){
		// 	projects.value = homeData.value.projects[0].小学
		// }else if(index==1){
		// 	projects.value = homeData.value.projects[1].初中
		// }else if(index==2){
		// 	projects.value = homeData.value.projects[2].高中
		// }
	}
	onMounted(() => {
		initData()
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
			tooltip: {
				trigger: 'axis'
			},
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
	//调整图表（均值）
	const adProjectChat = ()=>{
		getProjectChat({
			plan_start_id:3,
			plan_end_id:6,
			project_id:project_id.value || 3
		}).then(res=>{
			// console.log(res)
			let series = [{
				type: 'bar',
				name: res.source[1]
			}, {
				type: 'bar',
				name: res.source[2]
			}, {
				type: 'bar',
				name: res.source[3]
			}, {
				type: 'bar',
				name: res.source[4]
			}]
			option.value.dataset.source = res.source
			option.value.series = series
			barChat.value.setOption(option.value);
		})
	}
	const initData = ()=>{
		adProjectChat()
		getGradeChart({
			plan_start_id:3,
			plan_end_id:6,
			project_id:3
		}).then(res=>{
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
