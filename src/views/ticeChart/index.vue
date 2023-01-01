<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="学校">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="学级">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="片区">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="年级">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="集团">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="班级">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding-bottom: 18px;">
						<div
							style="display: flex;align-items: center;justify-content: end;flex-direction: column;height: 100%;">
							<el-button type="primary" style="margin-left: 0;" @click="onSubmit">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between" style="margin-bottom: 20px;">
				<h3 class="title" style="margin-bottom: 0;">全区各项体测指记录</h3>
				<div class="al-flex" style="align-items: center;">
					<!-- <p style="color: #222426;">体测计划</p> -->
					<el-form-item label="体测计划" size="default">
						<el-select v-model="value" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
							<el-option label="2021年7期" value="item.value" />
							<el-option label="2021年8期" value="item.value" />
						</el-select>
					</el-form-item>
					<span style="width: 24px;height: 1px;background: #979797;margin-bottom: 18px;"></span>
					<el-form-item size="default">
						<el-select v-model="value" class="m-2" style="width: 100px;margin: 0 10px;" placeholder="请选择">
							<el-option label="2021年7期" value="item.value" />
							<el-option label="2021年8期" value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="性别" size="default" style="width: 150px;margin-right: 15px;margin-left: 15px;">
						<el-select v-model="value" placeholder="请选择">
							<el-option label="全部" value="shanghai" />
							<el-option label="男" value="beijing" />
							<el-option label="女" value="beijing" />
						</el-select>
					</el-form-item>
					<el-form-item size="default">
						<el-button type="primary">查询</el-button>
					</el-form-item>
				</div>
			</div>
			<div style="margin: 30px 0;">
				<ul class="ty-tab">
					<li :class="{'active':tabIndex===index}" v-for="(tab,index) in tabs" @click="tabClick(index)">{{tab.name}}</li>
				</ul>
			</div>
			<div id='barChat' style="height: 300px;"></div>
			<div id='gradeChat' style="height: 300px;"></div>
		</div>
	</div>
</template>

<script setup>
	const queryForm = reactive({
		user: '',
		region: '',
	})
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
	const onSubmit = ()=>{
		
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

<style>
</style>