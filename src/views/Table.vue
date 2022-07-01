<template>
	<div class="al-box" style="display: flex;">
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
	<div class="al-box filter">
		<el-table :ref="tableRef" :data="tableData" style="width: 100%;" size="large"
			@selection-change="handleSelectionChange" table-layout="fixed" highlight-current-row>
			<el-table-column type="selection" width="55" />
			<el-table-column type="index" label="#" width="50" />
			<el-table-column prop="title" label="名称" align="center" width="180" />
			<el-table-column prop="amount" label="金额" />
			<el-table-column prop="num" label="数量" />
			<el-table-column prop="name" label="姓名" />
			<el-table-column prop="phone" label="手机号" />
			<el-table-column prop="date" label="时间" />
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- <el-button @click="toggleSelection([tableData[0],tableData[1]])">选中项</el-button> -->
		<el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
			:page-sizes="[100, 200, 300, 400]" background layout="total, sizes,prev, pager, next, jumper" :total="1000" @size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
	</div>
</template>

<script setup>
	import {
		getTable
	} from '@/api/user.js'
	import {
		ref,
		reactive
	} from 'vue'
	const filterForm = reactive({
		'name': '',
		'date': '2022-05-03'
	})
	const tableRef = ref([])
	const tableData = ref([])
	getTable().then(res => {
		tableData.value = res.data
		console.log(res.data)
	})
	const getList = () => {
		console.log('获取')
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

<style scoped>
	.el-form-item {
		margin-bottom: 0;
	}
</style>
