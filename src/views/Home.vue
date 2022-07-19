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
				<h2 class="card-h">服务器信息</h2>
				<el-card class="box-card">
					<table border="1">
						<tr>
							<th>Month</th>
							<th>Savings</th>
						</tr>
						<tr>
							<td>January</td>
							<td>$100</td>
						</tr>
					</table>
					<el-table :data="systemInfo" style="width: 100%">
						<el-table-column prop="system期" width="180" />
						<el-table-column prop="name" label="Name" width="180" />
						<el-table-column prop="address" label="Address" />
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="8">
				<h2 class="card-h">通知</h2>
				<div class="al-box">
					<el-empty description="description" />
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
	import IconBox from '@/components/alone/IconBox.vue'
	import {
		reactive,
		ref
	} from 'vue'
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
	const systemInfo = ref([
		{system:'Linux'},
		{mysql:'5.7'},
		{mysql:'5.7'},
	])
</script>

<style>
	.card-h {
		text-align: left;
		font-size: 16px;
		margin: 0 0 10px 0;
		color: var(--el-text-color-primary);
	}
</style>
