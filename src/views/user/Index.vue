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
					<button @click="dialogFormVisible=true" class="ty-btn">新增用户信息</button>
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
						<span @click="handleEdit(scope.$index, scope.row)">编辑</span>
					</template>
				</el-table-column>
				<!-- <el-table-column label="操作" align="center" width="80">
					<template #default="scope">
						<el-button size="default" @click="handleEdit(scope.$index, scope.row)">
							编辑
						</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<el-pagination :current-page="page" :page-size="pageSize" :background="true"
				:page-sizes="[100, 200, 300, 400]" layout="prev, pager, next,sizes, jumper" :total="400"
				@size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="" v-model="dialogFormVisible" title="新增用户信息" destroy-on-close>
			<div>
				新增用户信息
			</div>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog v-model="dialogEditFormVisible" title="编辑用户信息" destroy-on-close>
			<el-form :inline="false" :model="formInline" class="demo-form-inline" label-width="80" size="default"
				:scroll-to-error="true">
				<el-row :gutter="30">
					<el-col :span="12">
						<el-form-item label="用户名称">
							<el-input v-model="formInline.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="用户编号">
							<el-input v-model="formInline.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="购入时间">
							<el-input v-model="formInline.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="备注">
							<el-input v-model="formInline.user" :rows="3" type="textarea" placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属用户">
							<el-select v-model="formInline.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="分配片区">
							<el-select v-model="formInline.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="分配集团">
							<el-select v-model="formInline.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<div style="display: flex;justify-content: center;">
					<el-button>取消</el-button>
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
	const formInline = reactive({
		user: '',
		region: '',
	})
	const getListData = () => {
		getUser().then(res => {
			console.log(res)
			tableData.push(...res.list)
		})
	}
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const handleEdit = () => {
		dialogEditFormVisible.value = true
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
