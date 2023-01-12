<template>
	<div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">设备信息列表</h3>
				<div>
					<button @click="isFromEdit=false;dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18">
							<CirclePlusFilled />
						</el-icon>
						新增设备信息
					</button>
					<el-upload class="upload-demo" style="display: inline-block;" name="File"
						action="https://tiyuapi.nkjwx.com/api/school/fileupload/" :on-error="uploadFileError"
						:on-success="uploadFileError">
						<!-- <el-button type="primary" link>导入学校信息</el-button> -->
						<button class="ty-btn">导入设备信息</button>
					</el-upload>
					<button class="ty-btn"><a href="https://tiyuapi.nkjwx.com/static/学校导入模板.xlsx">下载模版</a></button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="name" label="学校名称" align="center" />
				<el-table-column prop="device_number" label="设备编号" align="center" />
				<el-table-column prop="purchase_date" label="购入时间" align="center" />
				<el-table-column prop="school_name" label="分配学校" align="center" />
				<el-table-column prop="area" label="片区" align="center" />
				<el-table-column prop="edu_group" label="集团" align="center" />
				<el-table-column label="操作" align="center" width="160">
					<template #default="scope">
						<el-button link @click="handleEdit(scope.row)">编辑</el-button>
						<!-- <el-button link @click="handleDelete(scope.row.id)">删除</el-button> -->
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
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑设备信息' :'新增设备信息'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" class="demo-form-inline" label-width="80"
				:scroll-to-error="true">
				<div class="al-flex">
					<div style="margin-right: 30px;">
						<el-form-item label="设备名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="设备编号" prop="device_number">
							<el-input v-model="form.device_number" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="购入时间" prop="purchase_date">
							<el-date-picker v-model="form.purchase_date" type="date" value-format="YYYY-MM-DD"
								placeholder="请选择" />
						</el-form-item>
					</div>
					<div>
						<el-form-item label="分配学校" prop="school_id">
							<el-select v-model="form.school_id" placeholder="请输入">
								<el-option v-for="item in queryOptionSchool" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
						<el-form-item label="片区" prop="area">
							<el-select v-model="form.area" placeholder="请输入">
							</el-select>
						</el-form-item>
						<el-form-item label="集团" prop="edu_group">
							<el-select v-model="form.edu_group" placeholder="请输入">
							</el-select>
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
		getDevice,
		addDevice,
		updateDevice,
		getDeviceOption
	} from '@/api/device'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const isFromEdit = ref(false)
	const queryForm = reactive({})
	const queryOptionSchool = ref({})
	const formRef = ref(null)
	const form = ref({})
	const rules = reactive({
		name: [{
			required: true,
			message: '必填项'
		}, ],
		device_number: [{
			required: true,
			message: '必填项'
		}],
		purchase_date: [{
			required: true,
			message: '必填项'
		}]
	})
	onMounted(() => {
		getListData()
		getDeviceOption().then(res => {
			console.log(res)
			queryOptionSchool.value = res
		})
	})
	const getListData = (page = 1) => {
		getDevice({
			page: page,
			page_size: pageSize.value
		}).then(res => {
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
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const handleEdit = (row) => {
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
			deleteSchool({
				id: id
			}).then(res => {
				getListData(page.value)
				ElMessage.success('删除成功')
			})
		})
	}
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return
			if (!isFromEdit.value) {
				addDevice(form.value).then(res => {
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				updateDevice(form.value).then(res => {
					getListData(page.value)
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			}

		})
	}
	const uploadFileError = (f) => {
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
