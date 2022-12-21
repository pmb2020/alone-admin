<template>
	<div class="table" style="height: 100%;">
		<div class="filter-box al-box" style="display: flex;">
			<el-form :inline="true" :model="filterForm" class="demo-form-inline" size="large">
				<el-form-item label="名称">
					<el-input v-model="filterForm.name" placeholder="要搜索的名称" />
				</el-form-item>
				<el-form-item label="订单状态">
					<el-select v-model="filterForm.type" placeholder="请选择">
						<el-option label="已完成" value="1" />
						<el-option label="未支付" value="2" />
						<el-option label="已取消" value="3" />
					</el-select>
				</el-form-item>
				<el-form-item label="日期">
					<el-date-picker v-model="filterForm.date" type="daterange" unlink-panels range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
				</el-form-item>
				<el-form-item>
					<el-button size="default" type="primary" @click="getList">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="al-box filter">
			<div class="al-flex" style="display: flex;margin-bottom: 30px;font-size: 12px;">
				<el-button color="#626aef" @click="handleAdd">
					<el-icon style="margin-right: 5px;">
						<CirclePlus />
					</el-icon>新增商品
				</el-button>
				<el-button>批量删除</el-button>
				<el-button>批量导出</el-button>
				<el-button>导出全部</el-button>
			</div>
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
				<el-table-column label="订单状态" align="center">
					<template #default="scope">
						<el-tag v-if="scope.row.type ===1" type="success">已完成</el-tag>
						<el-tag v-else-if="scope.row.type ===2" type="warning">未支付</el-tag>
						<el-tag v-else type="info">已取消</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="date" align="center" label="时间" width="165" />
				<el-table-column label="操作" align="center" width="170">
					<template #default="scope">
						<el-button size="default" color="#626aef" @click="handleEdit(scope.$index, scope.row)">编辑
						</el-button>
						<el-button size="default" type="danger" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		
			<div style="margin-top: 30px;display: flex;justify-content: flex-end;">
				<el-pagination v-model:currentPage="page" background v-model:page-size="pageSize"
					:page-sizes="[20, 50, 100, 500]" layout="total, sizes, prev, pager, next, jumper" :total="100" />
			</div>
		</div>
		<!-- 弹框表单 -->
		<el-dialog v-model="dialogFormVisible" title="新增商品">
			<el-form :model="tableForm" :label-width="80" size="large">
				<el-form-item label="名称：">
					<el-input v-model="tableForm.name" autocomplete="off" />
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="tableForm.type" placeholder="请选择">
						<el-option label="虚拟商品" value="shanghai" />
						<el-option label="实物商品" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="金额：">
					<el-input v-model="tableForm.amount" autocomplete="off" />
				</el-form-item>
				<el-form-item label="手机号：">
					<el-input v-model="tableForm.amount" autocomplete="off" />
				</el-form-item>
				<el-form-item label="详情：">
					<WangEditor ref="editorRef"></WangEditor>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="submitForm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import WangEditor from '@/components/WangEditor.vue'
	import {
		getTable
	} from '@/api/user.js'
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	const filterForm = reactive({
		'name': '',
		'date': ''
	})
	const shortcuts = [{
			text: '最近一周',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
				return [start, end]
			},
		},
		{
			text: '最近一月',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
				return [start, end]
			},
		},
		{
			text: '最近三个月',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
				return [start, end]
			},
		},
	]
	const tableForm = reactive({})
	const dialogFormVisible = ref(false)
	const tableRef = ref([])
	const tableData = ref([])
	const page = ref(1)
	const pageSize = ref(20)
	const getList = () => {
		console.log('筛选参数：', filterForm)
		getTable(filterForm).then(res => {
			tableData.value = res.data
			console.log(res.data)
		})
	}
	const handleSelectionChange = (val) => {
		console.log(val)
	}
	const handleEdit = (index, row) => {
		ElMessage('编辑')
	}
	const handleDelete = (row) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			console.log('删除', row)
		})
	}
	const handleAdd = () => {
		console.log('添加')
		dialogFormVisible.value = true
	}
	const editorRef = ref(null)
	const test = ref(null)
	const submitForm = () =>{
		tableForm.content = editorRef.value.valueHtml
		console.log(tableForm)
		console.log(editorRef)
		// console.log(editorRef.value.valueHtml)
	}
	onMounted(() => {
		getList()
	})
</script>

<style scoped>
	.filter-box .el-form{
		display: flex;
		justify-content: start;
	}
	.filter-box .el-form-item {
		margin-bottom: 0;
	}

	.el-input {
		width: 300px;
	}
</style>
