<template>
	<div class="al-body">
		<el-form :inline="true" :model="filterForm" class="demo-form-inline">
			<el-form-item label="名称">
				<el-input v-model="filterForm.name" placeholder="要搜索的名称" />
			</el-form-item>
			<el-form-item label="Activity zone">
				<el-select v-model="filterForm.date" placeholder="Activity zone">
					<el-option label="Zone one" value="shanghai" />
					<el-option label="Zone two" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
		</el-form>
	</div>
	<div class="filter" style="box-shadow: --el-box-shadow-light;">
		<el-table :ref="tableRef" :data="tableData" style="width: 100%;" @selection-change="handleSelectionChange"
			table-layout="fixed">
			<el-table-column type="selection" width="55" />
			<el-table-column type="index" label="#" width="50" />
			<el-table-column prop="date" label="名称" width="180" />
			<el-table-column prop="name" label="Date" />
			<el-table-column prop="address" label="Date" />
			<el-table-column prop="address" label="Date" />
		</el-table>
		<el-button @click="toggleSelection([tableData[0],tableData[1]])">选中项</el-button>
	</div>
</template>

<script setup>
	import {
		ref,reactive
	} from 'vue'
	const filterForm = reactive({
		'name':'',
		'date':'2022-05-03'
	})
	const tableRef = ref([])
	const tableData = [{
			date: '2022-05-03',
			name: '张三',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2022-05-03',
			name: '李四',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2022-05-03',
			name: '王二',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2022-05-03',
			name: '麻子',
			address: 'No. 189, Grove St, Los Angeles',
		},
	]
	
	const getList = () =>{
		
	}
	const handleSelectionChange = (val) => {
		console.log('fff')
		console.log(val)
	}
	const toggleSelection = (row) => {
		// console.log(tableRef.value.toggleSelection(row,undefined))
		console.log(tableData)
		// tableRef.clearSelection()
	}
</script>

<style>
</style>
