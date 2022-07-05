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
			<el-table-column type="selection" width="50" />
			<el-table-column type="index" label="#" />
			<el-table-column prop="title" label="名称" align="center" width="150" />
			<el-table-column label="图片" align="center" width="150">
				<template #default="scope">
					<el-image style="width: 120px; height: 80px" :src="scope.row.image" fit="fill" />
				</template>
			</el-table-column>
			<el-table-column prop="amount" align="center" label="金额" />
			<el-table-column prop="name" align="center" label="姓名" />
			<el-table-column prop="phone" align="center" label="手机号" />
			<el-table-column prop="date" align="center" label="时间" width="165" />
			<el-table-column label="操作" align="center" width="170">
				<template #default="scope">
					<el-button size="default" color="#626aef" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="default" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<div style="margin-top: 30px;display: flex;justify-content: space-between;">
			<el-select v-model="selectHandle" placeholder="选中项">
				<el-option label="删除" value="1" />
				<el-option label="编辑" value="2" />
			</el-select>
			<el-pagination v-model:currentPage="page" background v-model:page-size="pageSize"
				:page-sizes="[20, 50, 100, 500]" layout="total, sizes, prev, pager, next, jumper" :total="400" />
		</div>
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
	const selectHandle = ref()
	const tableData = ref([])
	const page = ref(1)
	const pageSize = ref(20)
	getTable().then(res => {
		tableData.value = res.data
		console.log(res.data)
	})
	const getList = () => {
		console.log('获取')
	}
	const handleSelectionChange = (val) => {
		let {id} =val
		console.log(id)
		console.log(val)
	}
	const handleEdit = (index,row) => {
		ElMessage('编辑')
	}
	const handleDelete = (row)=>{
		ElMessageBox.confirm('确认要删除吗','提示',{
			confirmButtonText:'确定',
			cancelButtonText:'取消',
			type:'warning'
		}).then(() => {
			console.log('删除',row)
		})
	}
</script>

<style scoped>
	.el-form-item {
		margin-bottom: 0;
	}
</style>
