<template>
	<div class="banner">
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
		<div class="al-container banner">
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
				<el-table-column prop="link" align="center" label="链接" />
				<el-table-column prop="sort" align="center" label="排序" />
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<el-switch v-model="scope.row.status" />
					</template>
				</el-table-column>
				<el-table-column prop="created_at" align="center" label="创建时间" width="170" />
				<el-table-column prop="created_at" align="center" label="更新时间" width="170" />
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
			<!-- 弹框表单 -->
			<el-dialog v-if="dialogVisible" v-model="dialogVisible" :title="isFromAdd ? '新增' :'编辑'" width="30%" @closed="form={}" :close-on-click-modal="false">
				<el-form ref="formRef" :model="form" :rules="rules" label-width="60px">
					<el-form-item label="标题" prop="title">
						<el-input v-model="form.title" autocomplete />
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
	import {updateBanner,apiBanner} from '@/api/banner.js'
	const uploadUrl=ref('http://127.0.0.1:188/admin/upload')
	const tableData = ref([])
	const dialogVisible = ref(false)
	const loading = ref(true)
	onMounted(() => {
		getList()
	})
	const handleSelectionChange = (val) => {
		console.log(val)
	}
	const getList = () => {
		apiBanner(filterForm.value).then(res => {
			tableData.value = res.data
			loading.value = false
		})
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
				getList()
				ElMessage.success('删除成功')
			})
		})
	}
	
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
	const formRef = ref({})
	const rules = reactive({
		title:[
			{ required: true, message: '必填项' },
		]
	})
	//重置搜索条件
	const resetFilterForm = (formEl) => {
		if (!formEl) return
		formEl.resetFields()
	}
	/**
	 * 弹框表单相关
	 */
	const form = ref({
		title: '',
		image: '',
		status: '',
		type: '',
		file: null,
		sort: '',
		link: '',
		note: '',
	})
	const isFromAdd = ref(false)
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
	//提交表单
	const submitForm = () => {
		formRef.value.validate((valid)=>{
			if(!valid) return
			if (isFromAdd.value) {
				apiBanner(form.value, 'post').then(res => {
					ElMessage.success('添加成功')
					dialogVisible.value = false
					getList()
				})
			} else {
				apiBanner(form.value,'put').then(res => {
					ElMessage.success('修改成功')
					dialogVisible.value = false
					getList()
				})
			}
		})
		
	}
	// 图片上传
	const fileChange = (e) => {
		form.value.image=URL.createObjectURL(e.raw)
		form.value.file=e.raw
	}
</script>

<style>
</style>
