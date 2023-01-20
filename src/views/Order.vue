<template>
	<div class="order">
		<!-- 筛选 -->
		<div class="al-container">
			<el-form class="al-flex" inline :model="filterForm" ref="filterFormRef" size="large">
				<el-form-item label="名称" prop="title">
					<el-input v-model="filterForm.title" placeholder="要搜索的名称" />
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="filterForm.type" placeholder="请选择">
						<el-option label="已完成" value="1" />
						<el-option label="未支付" value="2" />
						<el-option label="已取消" value="3" />
					</el-select>
				</el-form-item>
			</el-form>
			<div class="al-flex-between">
				<div>
					<el-button size="default" type="primary" @click="getList">搜索</el-button>
					<el-button size="default" plain @click="resetFilterForm(filterFormRef)">重置</el-button>
				</div>
				<el-button size="default" type="primary" @click="handleAdd">+ 新增</el-button>
			</div>
		</div>
		<div>
			<el-table :data="tableData" v-loading="loading" style="width: 100%;" size="large"
				@selection-change="handleSelectionChange" table-layout="fixed" highlight-current-row>
				<el-table-column type="selection" width="50" />
				<el-table-column type="index" label="#" />
				<el-table-column prop="title" label="标题" align="center" width="250" />
				<el-table-column label="图片" align="center" width="150">
					<template #default="scope">
						<el-image style="width: 120px; height: 80px" :src="scope.row.image" fit="fill" />
					</template>
				</el-table-column>
				<el-table-column prop="type" align="center" label="类型" />
				<el-table-column prop="link" align="center" label="链接" />
				<el-table-column prop="sort" align="center" label="排序" />
				<el-table-column label="启用" align="center">
					<template #default="scope">
						<el-switch v-model="scope.row.status" />
					</template>
				</el-table-column>
				<el-table-column prop="created_at" align="center" label="时间" width="165" />
				<el-table-column prop="note" align="center" label="备注" min-width="150" />
				<el-table-column label="操作" align="center" width="170">
					<template #default="scope">
						<el-button size="default" color="#626aef"
							@click="handleEdit(scope.row)">编辑
						</el-button>
						<el-button size="default" type="danger" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup>
	import {
		order
	} from '@/api/order.js'
	onMounted(()=>{
		getList()
	})
	/**
	 * 筛选搜索相关
	 */
	const filterForm = ref({
		title: '',
		status: '',
		type: '',
		sort: '',
		link: '',
		image: '',
		note: '',
	})
	const filterFormRef = ref({})
	//重置搜索条件
	const resetFilterForm = (formEl) => {
		if (!formEl) return
		formEl.resetFields()
	}
	const tableData = ref([])
	const loading = ref(true)
	const getList = () => {
		order(filterForm.value).then(res => {
			console.log(res)
			tableData.value = res.data
			loading.value = false
		})
	}
	//新增
	const handleAdd = () => {
		isFromAdd.value = true
		dialogVisible.value = true
	}
	// 编辑
	const handleEdit = (data)=>{
		form.value={...data};
		isFromAdd.value = false;
		dialogVisible.value = true
	}
	const handleDelete = (row) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			order({
				id: row.id
			}, 'delete').then(res => {
				getList()
				ElMessage.success('删除成功')
			})
		})
	}
	const handleSelectionChange = (val) => {
		console.log(val)
	}
</script>

<style>
</style>