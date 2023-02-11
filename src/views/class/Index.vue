<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="班级">
									<el-select v-model="queryForm.name" placeholder="请选择">
										<el-option v-for="(item,index) in queryOption.classes" :label="item.name"
											:value="item.name" />
									</el-select>
								</el-form-item>
								<el-form-item label="别称">
									<el-input v-model="queryForm.another_name" placeholder="请输入" />
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="年级">
									<el-select v-model="queryForm.grade_id" placeholder="请选择">
										<el-option v-for="(item,index) in queryOption.grades" :label="item.name"
											:value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="学级">
									<el-select v-model="queryForm.year" placeholder="请选择">
										<el-option v-for="(item,index) in queryOption.years" :label="item.year"
											:value="item.year" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="老师">
									<el-input v-model="queryForm.teacher_name" placeholder="请输入" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding: 0px 0 24px 0;">
						<div class="query-btn">
							<el-button @click="resetForm">重置</el-button>
							<el-button type="primary" style="margin-left: 0;" @click="getListData">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">班级信息列表</h3>
				<div>
					<button @click="dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18"><CirclePlusFilled /></el-icon>
						新增班级信息
					</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column label="学级" align="center">
					<template #default="scope">
						<span>{{scope.row.year}}级</span>
					</template>
				</el-table-column>
				<el-table-column prop="grade_name" label="年级" align="center" />
				<el-table-column prop="name" label="班级" align="center" />
				<el-table-column prop="another_name" label="别称" align="center" />
				<el-table-column prop="teachers" label="所属老师" align="center" width="180">
					<template #default="scope">
						<span v-for="(item,index) in scope.row.teachers">
							{{item.name}}<span v-if="index < scope.row.teachers.length-1">，</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="student_num" label="班级人数" align="center" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<router-link :to="'/base/class/info?id='+scope.row.id">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center" prop="status">
					<template #default="scope">
						<p v-if="scope.row.status==0">禁用</p>
						<p v-else-if="scope.row.status==1">启用</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="125">
					<template #default="scope">
						<el-button size="default" @click="handleEdit(scope.row,scope.$index)"
							style="border: none;background-color: transparent;">
							<el-icon>
								<EditPen />
							</el-icon>
						</el-button>
						<el-button size="default" @click="handleDelete(scope.row)"
							style="border: none;background-color: transparent;margin-left: 0;">
							<el-icon>
								<Delete />
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
		<el-dialog class="ty-dialog" width="1000px" v-model="dialogFormVisible" :before-close="dialogClose" title="新增班级信息" destroy-on-close>
			<AddForm :query-option="queryOption"></AddForm>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog class="ty-dialog" width="1000px" v-model="dialogEditFormVisible" title="编辑班级信息" destroy-on-close>
			<el-form :inline="false" :model="form" class="demo-form-inline" label-width="80" size="default"
				:scroll-to-error="true">
				<el-row>
					<el-col :span="6">
						<el-form-item label="学级">
							<el-select v-model="form.year" placeholder="请选择">
								<el-option v-for="(item,index) in addOption.years" :label="item"
									:value="item" />
							</el-select>
						</el-form-item>
						<el-form-item label="状态" prop="status">
							<el-switch v-model="form.status" :active-value="1" :inactive-value="0"
								style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ccc" inline-prompt
								active-text="启用" inactive-text="禁用" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="年级">
							<el-select v-model="form.base_grade_id" placeholder="请选择">
								<el-option v-for="(item,index) in addOption.grades" :label="item.name"
									:value="item.id" />
							</el-select>
						</el-form-item>
						<el-form-item label="所属老师" style="font-weight: bold;">
							<el-popover placement="right" :width="450" :visible="popoverVisible" trigger="click">
								<template #reference>
									<el-button link type="info" @click="popoverVisible=true">{{checkTextTea || '请选择'}}</el-button>
								</template>
								<div style="padding:10px">
									<p style="font-weight: bold;font-size: 15px;">选择老师</p>
									<el-checkbox v-model="checkAllTea" :indeterminate="isIndeterminateTea"
									 @change="handleCheckAllTea">全选</el-checkbox>
									<el-checkbox-group v-model="form.teacher_id" @change="handleCheckedTeaChange">
										<el-checkbox v-if="addOption.teachers[0]" v-for="tea in addOption.teachers[0].teachers" :key="tea.id" :label="tea.id">
											{{tea.name}}
										</el-checkbox>
									</el-checkbox-group>
									<div style="display: flex;justify-content: end;margin-top: 20px;">
										<el-button type="primary" size="default" @click="guanlianSubmit">{{checkedBtnText || '确认'}}</el-button>
										<el-button @click="popoverVisible=false">取消</el-button>
									</div>
								</div>
							</el-popover>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="班级">
							<el-select v-model="form.name" placeholder="请选择">
								<el-option v-for="(item,index) in addOption.classes" :label="item"
									:value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="别称">
							<el-input v-model="form.another_name" placeholder="请输入" />
						</el-form-item>
						<el-button type="primary" size="default" @click="toUpdate">更新</el-button>
					</el-col>
				</el-row>
			</el-form>
			<!-- 班级学生列表 -->
			<p style="margin: 15px 0 10px 25px;font-size: 16px;color: #222426;">学生信息</p>
			<el-table :data="studentData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="student_ID" label="学号" align="center" />
				<el-table-column prop="name" label="姓名" align="center" />
				<el-table-column prop="gender" label="性别" align="center" />
				<el-table-column prop="age" label="年龄" align="center" />
				<el-table-column prop="id_card" label="身份证号" align="center" width="180" />
				<!-- <el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button link size="default" @click="">迁出</el-button>
					</template>
				</el-table-column> -->
			</el-table>
		</el-dialog>
	</div>
</template>

<script setup>
	import {getClass,addClass,updateClass,getClassOptions,getClassAddOptions,getClassInfo,deleteClass} from '@/api/base'
	import AddForm from './AddForm.vue'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const queryForm = reactive({})
	const queryOption = ref({})
	const addOption = ref({})
	const form = ref({
		teacher_id:null
	})
	const tableData = reactive([])
	const studentData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const popoverVisible = ref(false)
	onMounted(()=>{
		getListData()
		getClassOptions().then(res => {
			queryOption.value = res
		})
		getClassAddOptions().then(res => {
			addOption.value = res
		})
	})
	const getListData = ()=>{
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getClass({...params,...queryForm}).then(res=>{
			// console.log(res)
			tableData.length = 0
			total.value = res.total
			tableData.push(...res.list)
		})
	}
	const handleEdit = (row) => {
		checkTextTea.value = '请选择'
		form.value = {...row}
		if(row.teachers.length>0){
			let teaIds = row.teachers.map(item=>{return item.id})
			let teaName = row.teachers.map(item=>{return item.name})
			checkTextTea.value = teaName.toString()
			form.value.teacher_id = teaIds
		}
		// console.log(row)
		// checkedAuthId.value=row.auth_ids.split(',')
		getClassInfo({class_id:row.id}).then(res=>{
			studentData.push(...res.students)
		})
		dialogEditFormVisible.value = true
	}
	//关联老师提交
	const checkedBtnText = ref('确认')
	const guanlianSubmit = ()=>{
		checkTextTea.value = ''
		if(form.value.teacher_id.length > 0){
			addOption.value.teachers[0].teachers.map(item=>{
				if(form.value.teacher_id.indexOf(item.id) != -1){
					checkTextTea.value += item.name + '，'
				}
			})
		}
		console.log(checkTextTea.value)
		popoverVisible.value = false
	}
	const toUpdate = () => {
		if(!form.value.teacher_id){
			form.value.teacher_id = []
		}
		form.value.teacher_id = form.value.teacher_id.toString()
		updateClass(form.value).then(res=>{
			// console.log(res)
			getListData()
			dialogEditFormVisible.value = false
			ElMessage.success('操作成功')
		})
		// form.value.teacher_id = form.value.teacher_id ? form.value.teacher_id :''
		// console.log(form.value.teacher_id.toString(),'submit!')
	}
	const dialogClose = (done)=>{
		getListData()
		done()
	}
	const handleDelete = (row) => {
		// console.log(row)
		let text = '确认要删除吗？' 
		if(row.student_num>0){
			text += '班级内学生将同步删除'
		}
		ElMessageBox.confirm(text, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			deleteClass({
				id: row.id
			}).then(res => {
				getListData()
				ElMessage.success('删除成功')
			})
		})
	}
	const handleCurrentChange = (number) => {
		page.value = number
		getListData()
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData(page.value)
	}
	const checkAllTea = ref(false)
	const checkTextTea = ref('请选择')
	const isIndeterminateTea = ref(false)
	const handleCheckAllTea = (val)=>{
		let teas = addOption.value.teachers[0].teachers.map(v=>{return v.id})
		form.value.teacher_id = val ? teas : []
		let teaLength = form.value.teacher_id.length
		if(teaLength > 0){
			checkedBtnText.value = '确认（已选择' + teaLength + '个老师）'
		}else {
			checkedBtnText.value = ''
		}
		isIndeterminateTea.value = false
	}
	const handleCheckedTeaChange = (val) =>{
		if(val.length > 0){
			checkedBtnText.value = '确认（已选择' + val.length + '个老师）'
		}else{
			checkedBtnText.value = ''
		}
	}
	//重置表单
	const resetForm = ()=>{
		queryForm.name = ''
		queryForm.grade_id = ''
		queryForm.teacher_name = ''
		queryForm.year = ''
	}
</script>

<style>
</style>
