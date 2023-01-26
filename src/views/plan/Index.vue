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
										<el-option v-for="item in queryOption.grades" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="体测项目">
									<el-select v-model="queryForm.project_id" placeholder="请选择">
										<el-option v-for="item in queryOption.projects" :label="item.name" :value="item.id" />
									</el-select>
								</el-form-item>
								<el-form-item label="计划执行时间">
									<el-date-picker v-model="queryForm.date" type="date" value-format="YYYY-MM-DD"
										placeholder="请选择" />
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="学校学段">
									<el-select v-model="queryForm.school_type" placeholder="请选择">
										<el-option v-for="item in queryOption.school_type" :label="item" :value="item" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding-bottom: 18px;">
						<div
							style="display: flex;align-items: center;justify-content: end;flex-direction: column;height: 100%;">
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
					<button @click="isFromAdd=true;form={};dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18"><CirclePlusFilled /></el-icon>
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
						<p v-else-if="scope.row.status==1">已发布</p>
						<p v-else-if="scope.row.status==2">执行中</p>
						<p v-else-if="scope.row.status==3">已完成</p>
					</template>
				</el-table-column>
				<el-table-column prop="project_id" label="体测项目" align="center" />
				<el-table-column prop="grade_id" label="体测对象" align="center" />
				<el-table-column prop="school_type" label="学校学段" align="center" />
				<el-table-column prop="start_date" label="计划执行时间" align="center" width="120" />
				<el-table-column label="详细信息" align="center" width="80">
					<template #default="scope">
						<router-link :to="'/base/plan/info?id='+scope.row.id">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="180">
					<template #default="scope">
						<el-button link @click="handleEdit(scope.row)">编辑</el-button>
						<el-button link @click="">发布任务</el-button>
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
			<el-form ref="formRef" :model="form" :rules="rules" label-width="80" label-position="left" size="default" :scroll-to-error="true">
				<el-row>
					<el-col :span="6">
						<el-form-item label="计划编号" prop="plan_number">
							<el-input v-model="form.plan_number" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="计划名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="体测对象">
							<el-select v-model="form.grade_ids" placeholder="请选择">
								<el-option v-for="item in queryOption.grades" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
						<el-form-item label="体测项目">
							<el-select v-model="form.project_ids" placeholder="请选择">
								<el-option v-for="item in queryOption.projects" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" :offset="6">
						<el-row>
							<el-col :span="24">
								<el-form-item label="执行开始时间" label-width="100" prop="title">
									<el-date-picker v-model="form.start_date" type="date" value-format="YYYY-MM-DD" placeholder="请选择" />
								</el-form-item>
								<el-form-item label="执行结束时间" label-width="100" prop="title">
									<el-date-picker v-model="form.end_date" type="date" value-format="YYYY-MM-DD" placeholder="请选择" />
								</el-form-item>
							</el-col>
							<el-col :span="20">
								<el-form-item label="备注" label-width="100">
									<el-input v-model="form.remark" :rows="3" type="textarea" placeholder="请输入" />
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
	import {getPlan,getPlanOption,addPlan} from '@/api/plan'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const queryForm = reactive({})
	const isFromAdd = ref(false)
	const form = ref({})
	const formRef = ref({})
	const rules = reactive({})
	const queryOption = ref({})
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	onMounted(() => {
		getListData()
		getPlanOption().then(res => {
			console.log(res)
			queryOption.value = res
		})
	})
	const getListData = () => {
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getPlan({...params,...queryForm}).then(res => {
			console.log(res)
			total.value = res.total
			tableData.length = 0
			tableData.push(...res.list)
		})
	}
	const handleEdit = (row) => {
		form.value = {...row}
		isFromAdd.value = false
		dialogFormVisible.value = true
	}
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return
			if (isFromAdd.value) {
				addPlan(form.value).then(res => {
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				// updateDevice(form.value).then(res => {
				// 	getListData(page.value)
				// 	dialogFormVisible.value = false
				// 	ElMessage.success('操作成功')
				// })
			}
	
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
