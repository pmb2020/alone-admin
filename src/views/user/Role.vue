<template>
	<div>
		<div class="ty-box">
			<h3 class="title">角色列表</h3>
			<div class="al-flex-between">
				<div class="al-flex">
					<el-input v-model="keywords" placeholder="请输入" />
					<el-button class="ty-btn" type="primary" size="default" @click="getListData()">查询</el-button>
				</div>
				<div>
					<button @click="isFromEdit=false;dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18">
							<CirclePlusFilled />
						</el-icon>
						新增角色信息
					</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="title" label="角色名称" align="center" width="180" />
				<el-table-column prop="desc" label="备注" align="center" />
				<el-table-column prop="create_at" label="创建时间" align="center" />
				<el-table-column label="操作" align="center" width="120">
					<template #default="scope">
						<el-button link @click="handleEdit(scope.row)">编辑</el-button>
						<el-button link @click="handleDelete(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 30px;display: flex;justify-content: end;">
				<el-pagination :current-page="page" :page-size="pageSize" :background="true"
					:page-sizes="[50, 100, 300, 500]" layout="prev, pager, next,sizes, jumper" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- 弹框表单 -->
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑角色信息' :'新增角色信息'" destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" class="demo-form-inline" label-width="80" size="default" :scroll-to-error="true">
				<el-form-item label="角色名称" prop="title" style="width: 50%;">
					<el-input v-model="form.title" placeholder="请输入" />
				</el-form-item>
				<el-form-item label="备注" prop="desc" style="width: 50%;">
					<el-input v-model="form.desc" :rows="3" type="textarea" placeholder="请输入" />
				</el-form-item>
				<div style="display: flex;justify-content: center;">
					<el-button @click="dialogFormVisible=false">取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">确认</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {
		getRole,
		addRole,
		updateRole,
		deleteRole
	} from '@/api/user'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const formRef = ref(null)
	const isFromEdit = ref(false)
	const keywords = ref('')
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const form = ref({})
	const rules = reactive({})
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	onMounted(() => {
		getListData()
	})
	const getListData = (page = 1) => {
		let params = {
			page: page,
			page_size: pageSize.value
		}
		if(keywords.value){
			params.key = keywords.value
		}
		getRole(params).then(res => {
			console.log(res)
			total.value = res.total
			tableData.length = 0
			tableData.push(...res.list)
		})
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData()
	}
	const handleCurrentChange = (number) => {
		page.value = number
		getListData(number)
	}
	const handleEdit = (row) => {
		form.value = {...row}
		isFromEdit.value = true
		dialogFormVisible.value = true
	}
	const handleDelete = (id) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			deleteRole({id:id}).then(res => {
				getListData(page.value)
				ElMessage.success('删除成功')
			})
		})
	}
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return
			if (!isFromEdit.value) {
				addRole(form.value).then(res => {
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				updateRole(form.value).then(res => {
					getListData(page.value)
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			}
	
		})
	}
</script>

<style>
	.query-btn{
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
</style>
