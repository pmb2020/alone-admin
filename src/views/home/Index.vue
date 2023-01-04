<template>
	<div>
		<el-row :gutter="30">
			<template v-for="(item,index) in boxLists" :key="index">
				<el-col :xs="8" :sm="6" :lg="4">
					<IconBox :bg-color="item.bgColor" :name="item.name" :icon="item.icon"></IconBox>
				</el-col>
			</template>
		</el-row>
		<el-row :gutter="30" style="margin-top: 10px;">
			<el-col :span="16">
				<h2 class="card-h">访客统计</h2>
				<el-card class="box-card">
					<Visitor></Visitor>
				</el-card>
			</el-col>
			<el-col :span="8">
				<h2 class="card-h">通知</h2>
				<div class="al-box">
					<el-empty description="description" />
				</div>
			</el-col>
		</el-row>
		<div style="margin-bottom:20px">
			<el-card class="box-card">
				<PieChatTest></PieChatTest>
			</el-card>
		</div>
		<div>
			<el-card class="box-card">
				<BarChartTest></BarChartTest>
			</el-card>
		</div>
	</div>
</template>

<script setup>
	import {getRouter} from '@/api/auth.js'
	import IconBox from '@/components/alone/IconBox.vue'
	import Visitor from './Visitor.vue'
	import PieChatTest from './PieChatTest.vue'
	import BarChartTest from './BarChartTest.vue'
	const boxLists = reactive([{
			bgColor: '#c8ddf7',
			name: '信息',
			icon: 'ElemeFilled'
		},
		{
			bgColor: '#c9f7d8',
			name: '客户',
			icon: 'Drizzling'
		},
		{
			bgColor: '#e9ddf9',
			name: '线索',
			icon: 'FolderChecked'
		},
		{
			bgColor: '#ffd7db',
			name: '老板',
			icon: 'GoodsFilled'
		},
		{
			bgColor: '#FFF2E5',
			name: '未读',
			icon: 'IceDrink'
		},
		{
			bgColor: '#c2eafd',
			name: '信息',
			icon: 'Lightning'
		},
	])
	onMounted(()=>{
		getRouter().then(res=>{
			console.log(res)
		})
	})
</script>

<style>
	.card-h {
		text-align: left;
		font-size: 16px;
		margin: 0 0 10px 0;
		color: var(--el-text-color-primary);
	}
</style>
