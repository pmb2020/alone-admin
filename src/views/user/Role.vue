<template>
	<div>
		<div class="ty-box">
			<h3 class="title">权限列表</h3>
			<div class="al-flex-between">
				<div class="al-flex">
					<el-input v-model="keywords" placeholder="请输入" />
					<el-button class="ty-btn" type="primary" size="default" @click="getListData()">查询</el-button>
				</div>
				<div>
					<button @click="isFromEdit=false;checkedAuthId=[];form={};dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18">
							<CirclePlusFilled />
						</el-icon>
						新增权限信息
					</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="title" label="权限名称" align="center" />
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
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑权限信息' :'新增权限信息'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" class="demo-form-inline" label-width="80" size="default"
				:scroll-to-error="true">
				<el-form-item label="权限名称" prop="title" style="width: 50%;">
					<el-input v-model="form.title" placeholder="请输入" />
				</el-form-item>
				<el-form-item label="备注" prop="desc" style="width: 50%;">
					<el-input v-model="form.desc" :rows="3" type="textarea" placeholder="请输入" />
				</el-form-item>
				<el-form-item label="功能权限" prop="desc" style="width: 50%;font-weight: bold;">
					<el-tree ref="treeRef" :data="authList" check-strictly :default-checked-keys="checkedAuthId" show-checkbox node-key="id"
						highlight-current :props="defaultProps" />
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
		deleteRole,
		getAuthList
	} from '@/api/user'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const formRef = ref(null)
	const isFromEdit = ref(false)
	const keywords = ref('')
	const queryForm = reactive({})
	const checkedAuthId = ref([])
	const authList = reactive([])
	const treeRef = ref(null)
	const defaultProps = ref({
		children: 'children',
		label: 'label',
	})
	const form = ref({})
	const rules = reactive({})
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	onMounted(() => {
		getListData()
		getAuthList().then(res => {
			res.forEach(items=>{
				items.label= items.title
				delete(items.title)
				items.children.forEach(child=>{
					child.label = child.title
					child.children.forEach(it=>{
						it.label = it.title
					})
				})
			})
			// console.log(res)
			authList.push(...res)
			console.log(authList)
		})
	})
	const getListData = (page = 1) => {
		let params = {
			page: page,
			page_size: pageSize.value
		}
		if (keywords.value) {
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
		console.log(row.auth_ids.split(','))
		checkedAuthId.value=row.auth_ids.split(',')
		form.value = {
			...row
		}
		isFromEdit.value = true
		dialogFormVisible.value = true
	}
	const handleDelete = (id) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			deleteRole({
				id: id
			}).then(res => {
				getListData(page.value)
				ElMessage.success('删除成功')
			})
		})
	}
	const onSubmit = () => {
		// console.log(treeRef.value!.getCheckedNodes(false, false))
		let auth_ids = treeRef.value.getCheckedKeys().join()
		// console.log(treeRef.value.getCheckedKeys())
		formRef.value.validate((valid) => {
			if (!valid) return
			if (!isFromEdit.value) {
				form.value.auth_ids = auth_ids
				addRole(form.value).then(res => {
					getListData()
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				form.value.auth_ids = auth_ids
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
	.query-btn {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
</style>
