<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-form-item label="姓名">
					<el-input v-model="queryForm.user" placeholder="请输入内容" />
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="queryForm.user" placeholder="请输入内容" />
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="queryForm.user" placeholder="请输入内容" />
				</el-form-item>
				<el-form-item label="班级">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="学校">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="年级">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="老师">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">学生信息列表</h3>
				<div>
					<button @click="dialogFormVisible=true" class="ty-btn">新增学生信息</button>
					<button class="ty-btn">导入学生信息</button>
					<button class="ty-btn">下载模版</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column prop="date" label="Date" align="center" width="180" />
				<el-table-column prop="name" label="Name" align="center" />
				<el-table-column prop="address" label="Address" align="center" />
				<el-table-column prop="address" label="Address" align="center" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<el-link :underline="false">查看</el-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="80">
					<template #default="scope">
						<el-button size="default" @click="handleEdit(scope.$index, scope.row)" style="border: none;background-color: transparent;">
							<el-icon><EditPen /></el-icon>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="" v-model="dialogFormVisible" title="新增学生信息" destroy-on-close>
			<AddForm></AddForm>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog v-model="dialogEditFormVisible" title="编辑学生信息" destroy-on-close>
			<div>das</div>
		</el-dialog>
	</div>
</template>

<script setup>
	import AddForm from './AddForm.vue'
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const tableData = reactive([{
			date: '2016-05-03',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-04',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-01',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
	])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const handleEdit = ()=>{
		dialogEditFormVisible.value = true
	}
	const onSubmit = () => {
		console.log('submit!')
	}
</script>

<style>
</style>
