<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" ref="queryFormRef" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item prop="name"  label="姓名">
									<el-input v-model="queryForm.name" placeholder="请输入" />
								</el-form-item>
								<el-form-item prop="class_name" label="班级">
									<el-select v-model="queryForm.class_name" placeholder="请选择">
										<el-option v-for="(item,index) in queryStuOption.classes" :label="item"
											:value="item" />
									</el-select>
								</el-form-item>
								<el-form-item prop="school_id" label="学校">
									<el-select v-model="queryForm.school_id" placeholder="请选择">
										<el-option v-for="(item,index) in queryStuOption.schools" :label="item.name"
											:value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="gender" label="性别">
									<el-select v-model="queryForm.gender" placeholder="请选择">
										<el-option label="男" value="男" />
										<el-option label="女" value="女" />
									</el-select>
								</el-form-item>
								<el-form-item prop="year" label="学级">
									<el-select v-model="queryForm.year" placeholder="请选择">
										<el-option v-for="(item,index) in queryStuOption.years" :label="item"
											:value="item" />
									</el-select>
								</el-form-item>
								<el-form-item prop="area" label="片区">
									<el-select v-model="queryForm.area" placeholder="请选择">
										<el-option v-for="(item,index) in queryStuOption.areas" :label="item.area"
											:value="item.area" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="age" label="年龄">
									<el-input v-model="queryForm.age" placeholder="请输入内容" />
								</el-form-item>
								<el-form-item prop="base_grade_id" label="年级">
									<el-select v-model="queryForm.base_grade_id" placeholder="请选择">
										<el-option v-for="(item,index) in queryStuOption.grades" :label="item.name"
											:value="item.id" />
									</el-select>
								</el-form-item>
								<el-form-item prop="edu_group" label="集团">
									<el-select v-model="queryForm.edu_group" placeholder="请选择">
										<el-option v-for="(item,index) in queryStuOption.edu_groups" :label="item.edu_group"
											:value="item.edu_group" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="student_ID" label="学号">
									<el-input v-model="queryForm.student_ID" placeholder="请输入内容" />
								</el-form-item>
								<el-form-item prop="teacher_name" label="老师">
									<el-input v-model="queryForm.teacher_name" placeholder="请输入内容" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding: 10px 0 28px 0;">
						<div class="query-btn">
							<el-button @click="resetForm(queryFormRef)">重置</el-button>
							<el-button type="primary" style="margin-left: 0;" @click="getListData">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">学生信息列表</h3>
				<div>
					<el-button :disabled="userType=='edu'" @click="dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18"><CirclePlusFilled /></el-icon>
						新增学生信息
					</el-button>
					<!-- <button :disabled="userType=='edu'" @click="dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18"><CirclePlusFilled /></el-icon>
						新增学生信息
					</button> -->
					<el-upload :disabled="userType=='edu'" class="upload-demo" style="display: inline-block;" :show-file-list="false" name="File"
						:action="'https://tiyuapi.nkjwx.com/api/student/fileupload/?token='+token" :on-success="uploadFileSuccess">
						<el-button :disabled="userType=='edu'" class="ty-btn">导入学生信息</el-button>
					</el-upload>
					<template v-if="userType=='edu'">
						<el-button disabled class="ty-btn">下载模版</el-button>
					</template>
					<template v-else>
						<el-button class="ty-btn"><a href="https://tiyuapi.nkjwx.com/static/学生导入模板.xlsx">下载模版</a></el-button>
					</template>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="name" label="姓名" align="center" />
				<el-table-column prop="gender" label="性别" align="center" />
				<el-table-column prop="age" label="年龄" align="center" />
				<el-table-column prop="student_ID" label="学号" align="center" />
				<el-table-column prop="year" label="学年" align="center" />
				<el-table-column prop="grade_name" label="年级" align="center" />
				<el-table-column prop="class_name" label="班级" align="center" />
				<el-table-column label="老师" align="center" width="80">
					<template #default="scope">
						<p v-for="item in scope.row.teachers">
							{{item.name}}
						</p>
					</template>
				</el-table-column>
				<el-table-column prop="school_name" label="学校" align="center" />
				<el-table-column prop="area" label="片区" align="center" />
				<el-table-column prop="address" label="集团" align="center" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<router-link :to="'/base/student/info?id='+scope.row.id">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="80">
					<template #default="scope">
						<el-button :disabled="userType=='edu'" size="default" @click="handleEdit(scope.$index, scope.row)"
							style="border: none;background-color: transparent;">
							<el-icon>
								<EditPen />
							</el-icon>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 30px;display: flex;justify-content: end;">
				<el-pagination :current-page="page" :page-size="pageSize" :background="true"
					:page-sizes="[50, 100, 300, 500]" layout="prev, pager, next,sizes, jumper" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="ty-dialog" width="1200px" v-model="dialogFormVisible" :before-close="dialogClose" title="新增学生信息" destroy-on-close>
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
								<el-option label="男" value="男" />
								<el-option label="女" value="女" />
							</el-select>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input v-model="form.age" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="学号">
							<el-input v-model="form.student_ID" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="班级">
							<el-input v-model="form.class_name" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="年级">
							<el-input v-model="form.grade_name" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="学级">
							<el-input v-model="form.year" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="老师">
							<el-select v-if="form.teachers[0]" v-model="form.teachers[0].name" disabled placeholder="请选择">
							</el-select>
						</el-form-item>
					</el-col>
				    <el-col :span="12" style="padding-right: 50px;">
						<el-form-item label="归属学校">
							<el-input v-model="form.school_name" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="归属片区">
							<el-input v-model="form.area" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="归属集团">
							<el-input v-model="form.edu_group" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="归属教委">
							<el-input v-model="form.edu_commission" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="form.id_card" disabled placeholder="请输入" />
						</el-form-item>
						<el-form-item label="入学时间">
							<el-date-picker disabled v-model="form.enter_school_date" type="date" format="YYYY-MM" value-format="YYYY-MM" placeholder="请选择" />
						</el-form-item>
					</el-col>
				  </el-row>
				<div style="display: flex;justify-content: center;">
					<el-button @click="dialogEditFormVisible=false">取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit()">确认</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {getStudent,updateStudent,getStuOptions} from '@/api/base'
	import AddForm from './AddForm.vue'
	const token = ref(localStorage.getItem('token'))
	const userType = ref(localStorage.getItem('usertype'))
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const queryStuOption = ref({})
	onMounted(()=>{
		getListData()
		getStuOptions().then(res=>{
			console.log(res)
			queryStuOption.value=res
		})
	})
	const queryForm = reactive({
		name:'',
		gender:'',
		age:'',
		student_ID:'',
		class_name:'',
		year:'',
		base_grade_id:'',
		teacher_name:'',
		school_id:'',
		area:'',
		edu_group:''
	})
	const queryFormRef = ref(null)
	const form = ref({})
	const tableData = reactive([])
	const getListData = ()=>{
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getStudent({...params,...queryForm}).then(res=>{
			console.log(res)
			tableData.length = 0
			total.value = res.total
			tableData.push(...res.list)
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
		console.log(form.value,'submit!')
		let params = {
			id:form.value.id,
			name:form.value.name,
			gender:form.value.gender,
			age:form.value.age,
			student_ID:form.value.student_ID,
		}
		updateStudent(params).then(res=>{
			dialogEditFormVisible.value = false
			getListData()
			ElMessage.success('修改成功')
		})
	}
	const resetForm = (formEl)=>{
		if (!formEl) return
		formEl.resetFields()
	}
	const dialogClose = (done)=>{
		getListData()
		done()
	}
	const handleCurrentChange = (number) => {
		page.value = number
		getListData(page.value)
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData(page.value)
	}
	//文件上传成功
	const uploadFileSuccess = (val)=>{
		if(val.responseCode==0){
			getListData()
			ElMessage.success(val.responseMsg)
		}else{
			ElMessage.error(val.responseMsg)
		}
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
