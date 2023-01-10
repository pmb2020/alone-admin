<template>
	<div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">学校列表</h3>
				<div>
					<button @click="isFromEdit=false;dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18">
							<CirclePlusFilled />
						</el-icon>
						新增学校信息
					</button>
					<el-upload class="upload-demo" style="display: inline-block;" name="File"
						action="https://tiyuapi.nkjwx.com/api/school/fileupload/" :on-error="uploadFileError" :on-success="uploadFileError">
						<!-- <el-button type="primary" link>导入学校信息</el-button> -->
						<button class="ty-btn">导入学校信息</button>
					</el-upload>
					<button class="ty-btn"><a href="https://tiyuapi.nkjwx.com/static/学校导入模板.xlsx">下载模版</a></button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="id" label="学校编号" align="center" />
				<el-table-column prop="name" label="学校名称" align="center" />
				<el-table-column prop="period" label="学校学段" align="center" />
				<el-table-column prop="area" label="片区" align="center" />
				<el-table-column prop="edu_group" label="集团" align="center" />
				<el-table-column prop="create_at" label="创建时间" align="center" width="180" />
				<el-table-column label="操作" align="center" width="160">
					<template #default="scope">
						<el-button link>查询</el-button>
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
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑学校信息' :'新增学校信息'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" class="demo-form-inline" label-width="80"
				:scroll-to-error="true">
				<div class="al-flex">
					<div style="margin-right: 30px;">
						<el-form-item label="学校名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="片区" prop="area">
							<el-input v-model="form.area" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="集团" prop="edu_group">
							<el-input v-model="form.edu_group" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="状态" prop="status">
							<el-switch v-model="form.status" active-value="1" inactive-value="0"
								style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ccc" inline-prompt
								active-text="启用" inactive-text="禁用" />
						</el-form-item>
					</div>
					<div>
						<el-form-item label="学段" prop="period">
							<el-select v-model="form.period" placeholder="请输入">
								<el-option label="小学" value="小学" />
								<el-option label="初中" value="初中" />
								<el-option label="高中" value="高中" />
							</el-select>
						</el-form-item>
						<el-form-item label="电话" prop="tel">
							<el-input v-model="form.tel" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="form.email" placeholder="请输入" />
						</el-form-item>
					</div>
				</div>
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
		getSchool,
		addSchool,
		updateSchool,
		deleteSchool
	} from '@/api/user'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const isFromEdit = ref(false)
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const formRef = ref(null)
	const form = ref({
		name: '',
		area: '',
	})
	const rules = reactive({
		name: [{
			required: true,
			message: '必填项'
		}, ]
	})
	onMounted(() => {
		getListData()
	})
	const getListData = (page = 1) => {
		getSchool({
			page: page,
			page_size: pageSize.value
		}).then(res => {
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
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
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
			deleteSchool({id:id}).then(res => {
				getListData(page.value)
				ElMessage.success('删除成功')
			})
		})
	}
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return
			if (!isFromEdit.value) {
				addSchool(form.value).then(res => {
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				updateSchool(form.value).then(res => {
					getListData(page.value)
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			}

		})
	}
	const uploadFileError = (f)=>{
		console.log(f)
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
