<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="姓名">
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
							</el-col>
							<el-col :span="6">
								<el-form-item label="性别">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="学级">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="片区">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="年龄">
									<el-input v-model="queryForm.user" placeholder="请输入内容" />
								</el-form-item>
								<el-form-item label="年级">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="集团">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="学号">
									<el-input v-model="queryForm.user" placeholder="请输入内容" />
								</el-form-item>
								<el-form-item label="老师">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="教委">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding: 10px 0 28px 0;">
						<div class="query-btn">
							<el-button @click="onSubmit">重置</el-button>
							<el-button type="primary" style="margin-left: 0;" @click="onSubmit">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">学生信息列表</h3>
				<div>
					<button @click="dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18"><CirclePlusFilled /></el-icon>
						新增学生信息
					</button>
					<button class="ty-btn">导入学生信息</button>
					<button class="ty-btn">下载模版</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="name" label="姓名" align="center" />
				<el-table-column prop="gender" label="性别" align="center" />
				<el-table-column prop="age" label="年龄" align="center" />
				<el-table-column prop="id_card" label="学号" align="center" />
				<el-table-column prop="address" label="学年" align="center" />
				<el-table-column prop="address" label="年级" align="center" />
				<el-table-column prop="address" label="班级" align="center" />
				<el-table-column prop="address" label="老师" align="center" />
				<el-table-column prop="address" label="学校" align="center" />
				<el-table-column prop="address" label="片区" align="center" />
				<el-table-column prop="address" label="集团" align="center" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<router-link to="/base/student/info">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="80">
					<template #default="scope">
						<el-button size="default" @click="handleEdit(scope.$index, scope.row)"
							style="border: none;background-color: transparent;">
							<el-icon>
								<EditPen />
							</el-icon>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="ty-dialog" width="1200px" v-model="dialogFormVisible" title="新增学生信息" destroy-on-close>
			<AddForm></AddForm>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog  class="ty-dialog" v-model="dialogEditFormVisible" title="编辑学生信息" destroy-on-close>
			<el-form :inline="false" :model="form" class="demo-form-inline" label-width="80" size="default" :scroll-to-error="true">
				<el-row :gutter="50">
				    <el-col :span="11">
						<el-form-item label="姓名">
							<el-input v-model="form.name" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="性别">
							<el-select v-model="form.gender" placeholder="请选择">
								<el-option label="男" value="1" />
								<el-option label="女" value="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input v-model="form.age" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="学号">
							<el-input v-model="form.student_id" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="班级">
							<el-select v-model="form.class_id" placeholder="请选择">
								<el-option label="男" value="1" />
								<el-option label="女" value="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="年级">
							<el-select v-model="form.grade_id" placeholder="请选择">
								<el-option label="男" :value="1" />
								<el-option label="女" :value="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="学级">
							<el-select v-model="form.school_id" placeholder="请选择">
								<el-option label="男" value="1" />
								<el-option label="女" value="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="老师">
							<el-select v-model="form.region" placeholder="请选择">
								<el-option label="男" value="1" />
								<el-option label="女" value="2" />
							</el-select>
						</el-form-item>
					</el-col>
				    <el-col :span="12" style="padding-right: 50px;">
						<el-form-item label="归属学校">
							<el-select v-model="form.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="归属片区">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="归属集团">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="归属教委">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="form.id_card" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="入学时间">
							<el-date-picker v-model="form.enter_school_date" type="date" value-format="YYYY-MM-DD" placeholder="请选择" />
						</el-form-item>
					</el-col>
				  </el-row>
				<div style="display: flex;justify-content: center;">
					<el-button>取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit()">确认</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {getStudent,updateStudent} from '@/api/base'
	import AddForm from './AddForm.vue'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	onMounted(()=>{
		getListData()
	})
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const form = ref({
		user: '',
		region: '',
	})
	const tableData = reactive([])
	const getListData = ()=>{
		getStudent({page:page.value,page_size:pageSize.value}).then(res=>{
			console.log(res)
			tableData.push(...res)
		})
	}
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const handleEdit = (index,row) => {
		dialogEditFormVisible.value = true
		console.log(row)
		form.value=row
	}
	const onSubmit = () => {
		console.log(form,'submit!')
		updateStudent(form.value).then(res=>{
			console.log(res)
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
