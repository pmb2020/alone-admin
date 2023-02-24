<template>
	<div class="banner">
		<!-- 筛选 -->
		<div class="al-container">
			<el-form class="al-flex" inline :model="queryForm" ref="queryFormRef" size="large">
				<el-form-item label="名称" prop="title">
					<el-input v-model="queryForm.title" placeholder="要搜索的名称" />
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="queryForm.type" placeholder="请选择">
						<el-option label="已完成" value="1" />
						<el-option label="未支付" value="2" />
						<el-option label="已取消" value="3" />
					</el-select>
				</el-form-item>
			</el-form>
			<div class="al-flex-between">
				<div>
					<el-button size="default" type="primary" @click="getListData">搜索</el-button>
					<el-button size="default" plain @click="resetQueryForm(queryFormRef)">重置</el-button>
				</div>
				<el-button size="default" type="primary" @click="handleAdd">+ 新增</el-button>
			</div>
		</div>
		<!-- 表格列表 -->
		<div class="al-container">
			<el-table :data="tableData" v-loading="loading" style="width: 100%;" size="large"
				@selection-change="handleSelectionChange" table-layout="fixed" highlight-current-row>
				<el-table-column type="selection" width="50" />
				<el-table-column type="index" label="#" />
				<el-table-column prop="title" label="标题" align="center" width="250" />
				<el-table-column label="图片" align="center" width="150">
					<template #default="scope">
						<el-image style="width: 120px; height: 80px" :src="scope.row.image" :preview-src-list="[scope.row.image]"  preview-teleported fit="fill" />
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
			<!-- 分页 -->
			<al-pagination :total="total" @page-change="getListData" />
			<!-- 弹框表单 -->
			<el-dialog v-if="dialogVisible" v-model="dialogVisible" :title="isFromEdit ? '编辑' :'新增'" @closed="form={}" :close-on-click-modal="false">
				<el-form ref="formRef" :model="form" :rules="rules" label-width="60px">
					<el-form-item label="标题" prop="title">
						<el-input v-model="form.title" autocomplete />
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="form.type" placeholder="请选择">
							<el-option label="淘宝" value="1" key="1" />
							<el-option label="天猫" value="2" key="2" />
						</el-select>
					</el-form-item>
					<el-form-item label="状态">
						<el-switch v-model="form.status" active-value="1" inactive-value="0" />
					</el-form-item>
					<el-form-item label="图片" style="font-weight: bold;">
						<el-upload class="al-uploader" name="file" action="#"
							:show-file-list="false" :on-change="fileChange" :auto-upload="false" >
							<el-image v-if="form.image"  style="width: 400px; height: 200px" :src="form.image" />
							<el-icon v-else class="al-uploader-icon">
								<Plus />
							</el-icon>
						</el-upload>
					</el-form-item>
					<el-form-item label="排序">
						<el-input v-model="form.sort" />
					</el-form-item>
					<el-form-item label="链接">
						<el-input v-model="form.link" />
					</el-form-item>
					<el-form-item label="备注">
						<el-input v-model="form.note" type="textarea" />
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
	import {banner,updateBanner,apiBanner} from '@/api/banner'
	const uploadUrl=ref('http://127.0.0.1:188/admin/upload')
	const tableData = ref([])
	const total = ref(0)
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
		apiBanner(queryForm).then(res => {
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
		title:[
			{ required: true, message: '必填项' },
		]
	})
	
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
				apiBanner(form.value,'put').then(res => {
					ElMessage.success('修改成功')
					dialogVisible.value = false
					getListData()
				})
			} else {
				form.value.image='11'
				apiBanner(form.value, 'post').then(res => {
					ElMessage.success('添加成功')
					dialogVisible.value = false
					getListData()
				})
			}
			
		})
	}
	
	// 图片上传
	const fileChange = (e) => {
		form.value.image=URL.createObjectURL(e.raw)
		form.value.file=e.raw
	}
	
	const handleDelete = (row) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			apiBanner({
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
		form.value={...data};
		isFromEdit.value = true;
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
