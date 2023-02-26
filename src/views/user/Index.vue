<template>
	<div class="banner">
		<!-- 筛选 -->
		<div class="al-container">
			<el-form class="al-flex" inline :model="queryForm" ref="queryFormRef" size="large">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="queryForm.nickname" placeholder="请输入" />
				</el-form-item>
				<el-form-item label="状态" prop="type">
					<el-select v-model="queryForm.type" placeholder="请选择">
						<el-option label="已完成" :value="1" />
						<el-option label="未支付" :value="2" />
						<el-option label="已取消" :value="3" />
					</el-select>
				</el-form-item>
			</el-form>
			<div class="al-flex-between">
				<div>
					<el-button size="default" type="primary" @click="getListData()">搜索</el-button>
					<el-button size="default" plain @click="resetQueryForm(queryFormRef)">重置</el-button>
				</div>
				<el-button size="default" type="primary" @click="handleAdd">+ 新增</el-button>
			</div>
		</div>
		<div class="al-container">
			<el-table :data="tableData" v-loading="loading" style="width: 100%;" size="large"
				@selection-change="handleSelectionChange" table-layout="fixed" highlight-current-row>
				<el-table-column type="selection" width="50" />
				<el-table-column type="index" label="#" />
				<el-table-column prop="nickname" label="标题" align="center" />
				<el-table-column prop="username" align="center" label="用户名" />
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<el-switch v-model="scope.row.status" @change="statusChange" :active-value="1" :inactive-value="0" />
					</template>
				</el-table-column>
				<el-table-column prop="created_at" align="center" label="创建时间" width="170" />
				<el-table-column label="操作" align="center" width="170">
					<template #default="scope">
						<el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<al-pagination :total="total" @page-change="getListData" />
			<!-- 弹框表单 -->
			<el-dialog v-if="dialogVisible" v-model="dialogVisible" :title="isFromEdit ? '编辑' :'新增'" width="30%" @closed="form={}" :close-on-click-modal="false">
				<el-form ref="formRef" :model="form" :rules="rules" label-width="70px">
					<el-form-item label="昵称" prop="nickname">
						<el-input v-model="form.nickname" autocomplete />
					</el-form-item>
					<el-form-item label="用户名" prop="username">
						<el-input v-model="form.username" />
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="form.phone" />
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="form.password" />
					</el-form-item>
					<el-form-item label="状态" prop="password">
						<el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogVisible = false">取消</el-button>
						<el-button type="primary" @click="submitForm">确定</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>

</template>

<script setup>
	import {banner,updateBanner} from '@/api/banner.js'
	import { apiUser } from '@/api/restful'
	const uploadUrl=ref('http://127.0.0.1:188/admin/upload')
	const total = ref(0)
	const tableData = ref([])
	const dialogVisible = ref(false)
	const loading = ref(true)
	onMounted(() => {
		getListData()
	})
	const handleSelectionChange = (val) => {
		let ids = val.map(item=>{
			return item.id
		})
		console.log(ids)
	}
	const getListData = (page = 1,pageSize = 20) => {
		queryForm.page = page
		queryForm.limit = pageSize
		apiUser(queryForm).then(res => {
			total.value = res.total
			tableData.value = res.data
			loading.value = false
		})
	}

	/**
	 * 筛选搜索相关
	 */
	const queryForm = reactive({})
	const queryFormRef = ref({})
	const formRef = ref({})
	const rules = reactive({
		username:[
			{ required: true, message: '必填项' },
		],
	})
	const statusChange = (val)=>{
		console.log(val)
	}
	/**
	 * 弹框表单相关
	 */
	const form = ref({})
	const isFromEdit = ref(false)
	//提交表单
	const submitForm = () => {
		formRef.value.validate((valid)=>{
			if(!valid) return
			if (isFromEdit.value) {
				apiUser(form.value,'put').then(res => {
					ElMessage.success('修改成功')
					dialogVisible.value = false
					getListData()
				})
			} else {
				apiUser(form.value, 'post').then(res => {
					ElMessage.success('添加成功')
					dialogVisible.value = false
					getListData()
				})
			}
			
		})
	}
	
	const handleDelete = (row) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			apiUser({
				id: row.id
			}, 'delete').then(res => {
				getListData()
				ElMessage.success('删除成功')
			})
		})
	}
	//新增
	const handleAdd = () => {
		form.value = {}
		isFromEdit.value = false
		dialogVisible.value = true
	}
	// 编辑
	const handleEdit = (data)=>{
		form.value = { ...data }
		isFromEdit.value = true
		dialogVisible.value = true
	}
	//重置搜索条件
	const resetQueryForm = (formEl) => {
		if (!formEl) return
		formEl.resetFields()
	}
</script>

<style>
</style>
