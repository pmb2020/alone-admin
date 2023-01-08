<template>
	<div>
		<div class="ty-box">
			<h3 class="title">用户列表</h3>
			<div class="al-flex-between">
				<div class="al-flex">
					<el-input v-model="queryForm.user" placeholder="请输入" />
					<el-button class="ty-btn" type="primary" size="default" @click="onSubmit">查询</el-button>
				</div>
				<div>
					<button @click="isFromEdit=false;dialogFormVisible=true" class="ty-btn">新增用户信息</button>
					<button class="ty-btn">导入用户信息</button>
					<button class="ty-btn">下载模版</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="name" label="姓名" align="center" />
				<el-table-column prop="role_id" label="角色" align="center" />
				<el-table-column prop="phone" label="电话" align="center" />
				<el-table-column prop="department" label="部门" align="center" />
				<el-table-column prop="status" label="状态" align="center" />
				<el-table-column prop="name" label="教师ID" align="center" />
				<el-table-column prop="id_card" label="身份证号" align="center" width="150" />
				<el-table-column label="操作" align="center" width="80">
					<template #default="scope">
						<el-button link @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 30px;display: flex;justify-content: end;">
				<el-pagination :current-page="page" :page-size="pageSize" :background="true"
					:page-sizes="[100, 200, 300, 400]" layout="prev, pager, next,sizes, jumper" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- 弹框表单 -->
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑用户信息' :'新增用户信息'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" label-width="80" label-position="left" size="default" :scroll-to-error="true">
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名" prop="title">
							<el-input v-model="form.title" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="工号" prop="title">
							<el-input v-model="form.title" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="手机号码" prop="title">
							<el-input v-model="form.title" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="邮箱" prop="title">
							<el-input v-model="form.title" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="身份证号" prop="title">
							<el-input v-model="form.title" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="体测对象">
							<el-select v-model="form.type" placeholder="请选择">
								<el-option label="淘宝" value="1" key="1" />
								<el-option label="天猫" value="2" key="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="体测项目">
							<el-select v-model="form.type" placeholder="请选择">
								<el-option label="淘宝" value="1" key="1" />
								<el-option label="天猫" value="2" key="2" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" :offset="4">
						<el-row>
							<el-col :span="24">
								<el-form-item label="执行开始时间" label-width="100" prop="title">
									<el-date-picker v-model="form.date" type="date" placeholder="请选择" />
								</el-form-item>
								<el-form-item label="执行结束时间" label-width="100" prop="title">
									<el-date-picker v-model="form.date" type="date" placeholder="请选择" />
								</el-form-item>
							</el-col>
							<el-col :span="20">
								<el-form-item label="备注" label-width="100">
									<el-input v-model="form.user" :rows="3" type="textarea" placeholder="请输入" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
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
		getUser
	} from '@/api/user'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const handleCurrentChange = (number) => {
		page.value=number
	}
	const handleSizeChange = (number) => {
		pageSize.value=number
	}
	onMounted(() => {
		getListData()
	})
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const formRef = ref(null)
	const isFromEdit = ref(false)
	const form = reactive({
		user: '',
		region: '',
	})
	const rules = reactive({})
	const getListData = (page) => {
		getUser({page:page,page_size:pageSize.value}).then(res => {
			console.log(res)
			total.value = res.total
			tableData.push(...res.list)
		})
	}
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const handleEdit = () => {
		isFromEdit.value=true
		dialogFormVisible.value = true
	}
	const onSubmit = () => {
		console.log('submit!')
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
