<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="班级">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="学校">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="年级">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="老师">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4">
						<div style="display: flex;justify-content: center;">
							<el-button style="float: right;" type="primary" @click="onSubmit">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">老师信息列表</h3>
				<!-- <div>
					<button @click="dialogFormVisible=true" class="ty-btn">新增班级信息</button>
				</div> -->
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column prop="date" label="Date" align="center" width="180" />
				<el-table-column prop="name" label="Name" align="center" />
				<el-table-column prop="address" label="Address" align="center" />
				<el-table-column prop="address" label="Address" align="center" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<router-link to="/base/teacher/info">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="120">
					<template #default="scope">
						<el-button size="default" @click="handleEdit(scope.$index, scope.row)"
							style="border: none;background-color: transparent;">
							关联老师
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="" v-model="dialogFormVisible" title="新增学生信息" destroy-on-close>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog class="ty-dialog" width="600px" v-model="dialogEditFormVisible" title="编辑学生信息" destroy-on-close>
			<el-form :inline="false" :model="formInline" class="demo-form-inline" label-width="80" size="default"
				:scroll-to-error="true">
				<div class="al-flex" style="">
					<div class="" style="margin-right: 30px;position: relative;left: -20px;">
						<el-form-item label="姓名">
							<el-input v-model="formInline.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="性别">
							<el-select v-model="formInline.region" placeholder="请选择">
								<el-option label="男" value="1" />
								<el-option label="女" value="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input v-model="formInline.user" placeholder="请输入" />
						</el-form-item>
					</div>
					<div style="">
						<el-form-item label="归属学校">
							<el-select v-model="formInline.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="归属片区">
							<el-select v-model="formInline.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="formInline.user" placeholder="请输入" />
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;justify-content: center;">
					<el-button>取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">确认</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const formInline = reactive({
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
	const handleEdit = () => {
		dialogEditFormVisible.value = true
	}
	const onSubmit = () => {
		console.log('submit!')
	}
</script>

<style>
</style>
