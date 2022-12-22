<template>
	<div class="al-flex-between">
		<h3 class="title" style="margin-bottom: 0;">全区各项体测指标分析</h3>
		<ul class="ty-tab">
			<li :class="{'active':gTabIndex==0}" @click="gTabClick(0)">小学</li>
			<li :class="{'active':gTabIndex==1}" @click="gTabClick(1)">初中</li>
			<li :class="{'active':gTabIndex==2}" @click="gTabClick(2)">高中</li>
		</ul>
	</div>
	<!-- <div>
		<p>体测计划</p>
	</div> -->
	<div style="margin: 30px 0;">
		<ul class="ty-tab">
			<li :class="{'active':tabIndex===index}" v-for="(tab,index) in tabs" @click="tabClick(index)">{{tab.name}}</li>
		</ul>
	</div>
	<div id='barChat' style="height: 300px;"></div>
	<div id='gradeChat' style="height: 300px;"></div>
</template>

<script setup>
	const tabs = ref([
		{id:1,name:'体重指数'},
		{id:2,name:'肺活量'},
		{id:3,name:'50米跑'},
		{id:4,name:'坐位体前屈'},
		{id:4,name:'1分钟跳绳'},
		{id:4,name:'1分钟仰卧起坐'},
		{id:4,name:'50*8往返跑'},
	])
	const tabIndex = ref(0)
	const tabClick = (index)=>{
		tabIndex.value = index
	}
	const gTabIndex = ref(0)
	const gTabClick = (index)=>{
		gTabIndex.value = index
	}
	import echarts from '@/utils/echarts.js'
	onMounted(() => {
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
		barChat.setOption(option);
		gradeChat.setOption(gradeChatOption);
		window.onresize = function() {
			barChat.resize();
			gradeChat.resize();
		};
	})
</script>

<style lang="scss">
	
</style>
