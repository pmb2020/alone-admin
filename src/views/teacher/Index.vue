<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="班级">
									<el-select v-model="queryForm.class_name" placeholder="请选择">
										<el-option v-for="(item,index) in queryOption.classes" :label="item"
											:value="item" />
									</el-select>
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
										<el-option v-for="(item,index) in queryOption.years" :label="item"
											:value="item" />
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
					<el-col :span="4">
						<div style="display: flex;justify-content: center;">
							<el-button style="float: right;" type="primary" @click="getListData">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">老师信息列表</h3>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="name" label="老师姓名" align="center" />
				<el-table-column prop="working_years" label="工龄" align="center" />
				<el-table-column prop="job_title" label="职务" align="center" />
				<el-table-column label="目前所带学级" align="center">
					<template #default="scope">
						<p v-for="item in scope.row.years">
							{{item.year}}级
						</p>
					</template>
				</el-table-column>
				<el-table-column label="目前所带年级" align="center">
					<template #default="scope">
						<p v-for="item in scope.row.grades">
							{{item.name}}
						</p>
					</template>
				</el-table-column>
				<el-table-column label="目前所带班级" align="center">
					<template #default="scope">
						<div v-for="item in scope.row.grades" :key="item.id">
							<p v-for="it in item.classes">
								{{it.name}}
							</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="详细信息" align="center">
					<template #default="scope">
						<router-link :to="'/base/teacher/info?id='+scope.row.id">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="100">
					<template #default="scope">
						<el-button size="default" @click="guanlian(scope.row)"
							style="border: none;background-color: transparent;">
							关联班级
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center" width="120">
					<template #default="scope">
						<el-button link @click="statusClick(scope.row.id,1)">启用</el-button>
						<el-button link @click="statusClick(scope.row.id,0)">禁用</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 30px;display: flex;justify-content: end;">
				<el-pagination :current-page="page" :page-size="pageSize" :background="true"
					:page-sizes="[50, 100, 300, 500]" layout="prev, pager, next,sizes, jumper" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- 关联 -->
		<el-dialog class="ty-dialog" width="1000" v-model="dialogFormVisible" title="关联班级" destroy-on-close>
			<el-form :model="form" class="demo-form-inline" label-width="80" size="default" :scroll-to-error="true">
				<el-row>
					<el-col :span="6">
						<el-form-item label="老师姓名">
							<el-input v-model="form.name" disabled placeholder="" />
						</el-form-item>
						<el-form-item label="所带班级" style="font-weight: bold;">
							<el-popover placement="right" :width="400" :visible="popoverVisible" trigger="click">
								<template #reference>
									<el-button link type="info" @click="popoverVisible=true">{{checkedGradeText || '请选择'}}</el-button>
								</template>
								<div>
									<p style="font-weight: bold;font-size: 15px;">选择班级</p>
									<el-checkbox v-model="checkedAll" @change="checkedAllChange" label="全选" size="large" />
									<el-tree ref="treeRef" :data="gradeList" :default-checked-keys="[]" @check-change="checkedgradeChage" show-checkbox node-key="id"
										highlight-current :props="defaultProps" />
									<div style="display: flex;justify-content: center;margin-top: 20px;">
										<el-button @click="popoverVisible=false">取消</el-button>
										<el-button type="primary" size="default" @click="guanlianSubmit">确认</el-button>
									</div>
								</div>
							</el-popover>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="工龄">
							<el-input v-model="form.working_years" disabled placeholder="" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职务">
							<el-input v-model="form.job_title" disabled placeholder="" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="教师ID">
							<el-input v-model="form.id" disabled placeholder="" />
						</el-form-item>
					</el-col>
				</el-row>
				<div style="display: flex;justify-content: end;">
					<el-button @click="dialogFormVisible=false">取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">确认</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {getTeacher,joinClass,getTeacherOptions,updateTeaStatus,getTeaInfo} from '@/api/base'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const queryOption = ref({})
	const queryForm = reactive({})
	const form = ref({})
	const treeRef = ref(null)
	const defaultProps = ref({
		children: 'classes',
		label: 'label',
	})
	const gradeList = ref([])
	const checkedGradeText = ref('请选择')
	const checkedAll = ref(null)
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const popoverVisible = ref(false)
	onMounted(() => {
		getListData()
		getTeacherOptions().then(res => {
			queryOption.value = res
			console.log(res)
		})
	})
	const getListData = () => {
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getTeacher({...params,...queryForm}).then(res => {
			console.log(res)
			tableData.length = 0
			total.value = res.total
			tableData.push(...res.list)
		})
	}
	const handleCurrentChange = (number) => {
		page.value = number
		getListData(page.value)
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData(page.value)
	}
	const handleEdit = () => {
		checkedAll.value = false
		dialogEditFormVisible.value = true
	}
	const checkedgradeChage = (row,ele)=>{
		// console.log(row)
		// console.log(ele)
	}
	//关联班级
	const guanlian = (row) => {
		getTeaInfo({teacher_id:row.id}).then(res=>{
			res[0].grades.forEach(item=>{
				item.label = item.year+'级'+item.name
				item.classes.forEach(child=>{
					child.label = child.name
				})
			})
			gradeList.value = res[0].grades
		})
		popoverVisible.value = false
		dialogFormVisible.value = true
		console.log(row)
		form.value = {...row}
	}
	//关联班级提交
	const guanlianSubmit = ()=>{
		checkedGradeText.value = ''
		treeRef.value.getCheckedNodes().map(item=>{
			if(item.year){
				checkedGradeText.value += item.label
				item.classes.map(child=>{
					checkedGradeText.value += child.label
				})
				checkedGradeText.value += '，'
			}
		})
		// console.log(checkedGradeText.value)
		// console.log(treeRef.value.getCheckedNodes())
		popoverVisible.value = false
	}
	//全选
	const checkedAllChange = (val)=>{
		// console.log(gradeList.value)
		if(val && gradeList.value.length >0){
			treeRef.value.setCheckedNodes(gradeList.value)
		}else{
			treeRef.value.setCheckedKeys([])
		}
	}
	//状态，禁用/启用
	const statusClick = (id,status)=>{
		updateTeaStatus({teacher_id:id,status:status}).then(res=>{
			ElMessage.success('状态已'+ (status == 1 ? '启用':'禁用'))
		})
	}
	const onSubmit = () => {
		let class_ids = treeRef.value.getCheckedKeys(true).join()
		joinClass({
			teacher_id:form.value.id,
			class_ids:class_ids
		}).then(res=>{
			ElMessage.success('关联成功')
			getListData()
			dialogFormVisible.value = false
		})
	}
</script>

<style>
</style>
