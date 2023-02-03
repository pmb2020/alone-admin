<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="计划名称">
									<el-input v-model="queryForm.name" placeholder="请输入" />
								</el-form-item>
								<el-form-item label="计划编号">
									<el-input v-model="queryForm.plan_number" placeholder="请输入" />
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="计划状态">
									<el-select v-model="queryForm.status" placeholder="请选择">
										<el-option label="已取消" :value="-1" />
										<el-option label="待发布" :value="0" />
										<el-option label="已发布" :value="1" />
										<el-option label="执行中" :value="2" />
										<el-option label="已完成" :value="3" />
									</el-select>
								</el-form-item>
								<el-form-item label="体测对象">
									<el-select v-model="queryForm.grade_id" placeholder="请选择">
										<el-option v-for="item in queryOption.grades" :label="item.name"
											:value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="体测项目">
									<el-select v-model="queryForm.project_id" placeholder="请选择">
										<el-option v-for="item in queryOption.projects" :label="item.name"
											:value="item.id" />
									</el-select>
								</el-form-item>
								<el-form-item label="学校名称">
									<el-select v-model="queryForm.school_name" placeholder="请选择">
										<el-option v-for="item in queryOption.school_list" :label="item.name"
											:value="item.name" />
									</el-select>
								</el-form-item>
								<!-- <el-form-item label="学校名称">
									<el-input v-model="queryForm.school_name" placeholder="请输入" />
								</el-form-item> -->
							</el-col>
							<el-col :span="6">
								<el-form-item label="学校学段">
									<el-select v-model="queryForm.school_type" @change="selSchType" placeholder="请选择">
										<el-option v-for="item in queryOptionOrigin.school_type" :label="item"
											:value="item" />
									</el-select>
								</el-form-item>
								<el-form-item label="计划执行时间">
									<el-date-picker v-model="queryForm.date" type="date" value-format="YYYY-MM-DD"
										placeholder="请选择" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding-bottom: 18px;">
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
				<h3 class="title" style="margin-bottom: 0;">体测计划列表</h3>
				<div>
					<button @click="addPlanFun" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18">
							<CirclePlusFilled />
						</el-icon>
						新增体测计划
					</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="plan_number" label="计划编号" align="center" />
				<el-table-column prop="name" label="计划名称" align="center" />
				<el-table-column prop="status" label="计划状态" align="center" width="80">
					<template #default="scope">
						<p v-if="scope.row.status==-1">已取消</p>
						<p v-else-if="scope.row.status==0">待发布</p>
						<p v-else-if="scope.row.status==1">待执行</p>
						<p v-else-if="scope.row.status==2">执行中</p>
						<p v-else-if="scope.row.status==3">已完成</p>
					</template>
				</el-table-column>
				<el-table-column prop="projects" label="体测项目" align="center" width="180">
					<template #default="scope">
						<span v-for="(item,index) in scope.row.projects">
							{{item.name}}<span v-if="index < scope.row.projects.length-1">，</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="grades" label="体测对象" align="center">
					<template #default="scope">
						<span v-for="(item,index) in scope.row.grades">
							{{item.name}}<span v-if="index < scope.row.projects.length-1">，</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="school_type" label="学校学段" align="center" />
				<el-table-column prop="start_date" label="计划执行时间" align="center" width="120" />
				<el-table-column label="详细信息" align="center" width="80">
					<template #default="scope">
						<router-link :to="'/base/plan/info?id='+scope.row.id">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="180">
					<template #default="scope">
						<el-button v-if="scope.row.status==0 || scope.row.status==1" link @click="handleEdit(scope.row)">编辑</el-button>
						<el-button v-if="scope.row.status==0" link @click="updatePlanStatus(scope.row.id,1)">发布任务</el-button>
						<el-button v-if="scope.row.status==1 || scope.row.status==2" link @click="updatePlanStatus(scope.row.id,-1)">取消任务</el-button>
						<el-button v-if="scope.row.status==3" link>不可编辑</el-button>
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
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromAdd ? '新增体测计划' :'编辑体测计划'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" label-width="80" label-position="left" size="default"
				:scroll-to-error="true">
				<el-row>
					<el-col :span="11">
						<el-form-item label="计划编号" prop="plan_number">
							<el-input v-model="form.plan_number" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="计划名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item v-if="userType=='edu'" label="学校学段">
							<el-select v-model="form.school_type" @change="selSchType" placeholder="请选择">
								<el-option v-for="item in queryOptionOrigin.school_type" :label="item" :value="item" />
							</el-select>
						</el-form-item>
						<el-form-item label="体测对象" style="font-weight: bold;">
							<el-popover placement="right" :width="400" trigger="click">
								<template #reference>
									<el-button link type="info">{{checkTextGrade}}</el-button>
								</template>
								<el-checkbox v-model="checkAllGrade" :indeterminate="isIndeterminateGrade"
								 @change="handleCheckAllGrade">全选</el-checkbox>
								<el-checkbox-group v-model="form.grade_ids">
									<el-checkbox v-for="item in queryOption.grades" :key="item.id" :label="item.id">
										{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</el-popover>
						</el-form-item>
						<el-form-item label="体测项目" style="font-weight: bold;">
							<el-popover placement="right" :width="400" trigger="click">
								<template #reference>
									<el-button link type="info">{{checkTextProject}}</el-button>
								</template>
								<el-checkbox v-model="checkAllProject" :indeterminate="isIndeterminateProject"
								 @change="handleCheckAllProject">全选</el-checkbox>
								<el-checkbox-group v-model="form.project_ids" @change="CheckedProjectChange">
									<el-checkbox v-for="item in queryOption.projects" :key="item.id" :label="item.id">
										{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</el-popover>
						</el-form-item>
					</el-col>
					<el-col :span="12" :offset="1">
						<el-form-item label="执行开始时间" label-width="100" prop="title">
							<el-date-picker v-model="form.start_date" type="date" value-format="YYYY-MM-DD"
								placeholder="请选择" />
						</el-form-item>
						<el-form-item label="执行结束时间" label-width="100" prop="title">
							<el-date-picker v-model="form.end_date" type="date" value-format="YYYY-MM-DD"
								placeholder="请选择" />
						</el-form-item>
						<el-form-item v-if="userType=='edu'" label="参与学校" style="font-weight: bold;">
							<el-popover placement="right" :width="400" trigger="click">
								<template #reference>
									<el-button link type="info">请选择</el-button>
								</template>
								<el-checkbox v-model="checkAllSchool" :indeterminate="isIndeterminateSchool"
								 @change="handleCheckAllSchool">全选</el-checkbox>
								<el-checkbox-group v-model="form.school_ids">
									<el-checkbox v-for="item in queryOption.school_list" :key="item.id" :label="item.id">
										{{item.name}}
									</el-checkbox>
									<!-- <el-checkbox v-for="item in queryOption.school_list.初中" :key="item.id" :label="item.id">
										{{item.name}}
									</el-checkbox>
									<el-checkbox v-for="item in queryOption.school_list.高中" :key="item.id" :label="item.id">
										{{item.name}}
									</el-checkbox> -->
								</el-checkbox-group>
							</el-popover>
						</el-form-item>
						<el-form-item label="备注" label-width="100">
							<el-input v-model="form.remark" :rows="3" type="textarea" placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<div style="display: flex;justify-content: center;">
					<el-button type="primary" @click="dialogFormVisible=false">取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">保存</el-button>
					<el-button type="primary" size="default" @click="onSubmit">发布</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {
		getPlan,
		getPlanOption,
		addPlan,updatePlan,updateStatus
	} from '@/api/plan'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const userType = ref(localStorage.getItem('usertype'))
	const queryForm = reactive({})
	const isFromAdd = ref(false)
	const form = ref({
		grade_ids: null,
		project_ids: null,
		school_ids:null,
	})
	const formRef = ref({})
	const rules = reactive({})
	const queryOption = ref({})
	const queryOptionOrigin = ref({})
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	onMounted(() => {
		getListData()
		getPlanOption().then(res => {
			console.log(res)
			queryOptionOrigin.value = res
		})
	})
	const getListData = () => {
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getPlan({
			...params,
			...queryForm
		}).then(res => {
			console.log(res)
			total.value = res.total
			tableData.length = 0
			tableData.push(...res.list)
		})
	}
	const handleEdit = (row) => {
		console.log(queryOptionOrigin.value)
		console.log(row)
		form.value = {
			...row
		}
		if(row.grades[0].id===0){
			form.value.grade_ids = queryOptionOrigin.value.grades[row.school_type].map(v=>{return v.id})
			var gradeName = queryOptionOrigin.value.grades[row.school_type].map(v=>{return v.name})
		}else{
			form.value.grade_ids = row.grades.map(item=>{return item.id})
			var gradeName = row.grades.map(v=>{return v.name}) || []
		}
		checkTextGrade.value = gradeName.toString()
		form.value.project_ids = row.projects.map(item=>{return item.id})
		isFromAdd.value = false
		dialogFormVisible.value = true
		if(row.school_type){
			let val = row.school_type
			queryOption.value.grades = queryOptionOrigin.value.grades[val]
			queryOption.value.projects = queryOptionOrigin.value.projects[val]
			queryOption.value.school_list = queryOptionOrigin.value.school_list[val]
		}
	}
	
	const addPlanFun = () =>{
		isFromAdd.value=true;
		form.value={};
		checkTextGrade.value = '请选择'
		checkTextProject.value = '请选择'
		dialogFormVisible.value=true
	}
	//联动-选择学段
	const selSchType = (val)=>{
		// console.log(val)
		queryForm.school_name = ''
		queryForm.project_id = ''
		queryForm.grade_id = ''
		queryOption.value.grades = queryOptionOrigin.value.grades[val]
		queryOption.value.projects = queryOptionOrigin.value.projects[val]
		queryOption.value.school_list = queryOptionOrigin.value.school_list[val]
	}
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return
			form.value.grade_ids = form.value.grade_ids ? form.value.grade_ids.toString() :''
			form.value.project_ids = form.value.project_ids ? form.value.project_ids.toString() :''
			form.value.school_ids = form.value.school_ids ? form.value.school_ids.toString() :''
			if (isFromAdd.value) {
				addPlan(form.value).then(res => {
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				console.log(form.value,'更新')
				updatePlan(form.value).then(res => {
					getListData(page.value)
					dialogFormVisible.value = false
					ElMessage.success('更新成功')
				})
			}

		})
	}
	//重置搜索表单
	const resetForm = ()=>{
		queryForm.name = ''
		queryForm.plan_number = ''
		queryForm.status = ''
		queryForm.date = ''
		queryForm.school_type = ''
		queryForm.project_id = ''
		queryForm.grade_id = ''
		queryForm.school_name = ''
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData()
	}
	const handleCurrentChange = (number) => {
		page.value = number
		getListData(number)
	}
	//更新计划状态
	const updatePlanStatus = (id,status)=>{
		updateStatus({
			id:id,
			status:status
		}).then(res=>{
			getListData()
			ElMessage.success('操作成功')
		})
	}
	//全选
	const checkTextGrade = ref('请选择')
	const checkAllGrade = ref(false)
	const isIndeterminateGrade = ref(false)
	const handleCheckAllGrade = (val)=>{
		let grades = queryOption.value.grades.map(v=>{return v.id})
		form.value.grade_ids = val ? grades : [],
		isIndeterminateGrade.value = false
	}
	const checkTextProject = ref('请选择')
	const checkAllProject = ref(false)
	const isIndeterminateProject = ref(false)
	const handleCheckAllProject = (val)=>{
		let projects = queryOption.value.projects.map(v=>{return v.id})
		form.value.project_ids = val ? projects : [],
		isIndeterminateProject.value = false
	}
	const CheckedProjectChange = (val)=>{
		console.log(val)
	}
	const checkAllSchool = ref(false)
	const isIndeterminateSchool = ref(false)
	const handleCheckAllSchool = (val)=>{
		let schools = queryOption.value.school_list.map(v=>{return v.id})
		form.value.school_ids = val ? schools : [],
		isIndeterminateSchool.value = false
	}
	//老的
	const handleCheckAllSchool1 = (val)=>{
		let schools1 = queryOption.value.school_list.小学.map(v=>{return v.id})
		let schools2 = queryOption.value.school_list.初中.map(v=>{return v.id})
		let schools3 = queryOption.value.school_list.高中.map(v=>{return v.id})
		let schools = [...schools1,...schools2,...schools3]
		form.value.school_ids = val ? schools : [],
		isIndeterminateSchool.value = false
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
