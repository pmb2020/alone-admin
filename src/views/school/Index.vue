<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="学校名称">
									<el-input v-model="queryForm.key" placeholder="请输入" />
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="所属片区">
									<el-select v-model="queryForm.area" placeholder="请选择">
										<el-option v-for="(item,index) in queryOption.areas" :label="item.area"
											:value="item.area" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="所属集团">
									<el-select v-model="queryForm.edu_group" placeholder="请选择">
										<el-option v-for="(item,index) in queryOption.edu_groups" :label="item.edu_group"
											:value="item.edu_group" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="学校学段">
									<el-select v-model="queryForm.period" placeholder="请选择">
										<el-option label="小学" value="小学" />
										<el-option label="初中" value="初中" />
										<el-option label="高中" value="高中" />
									</el-select>
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
				<h3 class="title" style="margin-bottom: 0;">学校信息列表</h3>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />	
				<el-table-column prop="name" label="学校名称" align="center" width="180" />
				<el-table-column prop="period" label="学校类别" align="center" />
				<el-table-column prop="area" label="所属片区" align="center" />
				<el-table-column prop="edu_group" label="所属集团" align="center" />
				<el-table-column prop="student_num" label="学生数量" align="center" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<router-link :to="'/base/school/info?id='+scope.row.id">查看</router-link>
					</template>
				</el-table-column>
				<!-- <el-table-column label="操作" align="center" width="80">
					<template #default="scope">
						<el-button size="default" @click="handleEdit(scope.$index, scope.row)"
							style="border: none;background-color: transparent;">
							<el-icon>
								<EditPen />
							</el-icon>
						</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<div style="margin-top: 30px;display: flex;justify-content: end;">
				<el-pagination :current-page="page" :page-size="pageSize" :background="true"
					:page-sizes="[50, 100, 300, 500]" layout="prev, pager, next,sizes, jumper" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="ty-dialog" width="1000px" v-model="dialogFormVisible" title="新增学校信息" destroy-on-close>
			<AddForm></AddForm>
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
	import {addClass,updateClass,getClassOptions,getSchool,getSchoolOpt} from '@/api/base'
	import AddForm from './AddForm.vue'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const queryForm = reactive({})
	const queryOption = ref({})
	const formInline = reactive({
		user: '',
		region: '',
	})
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	onMounted(()=>{
		getListData()
		getSchoolOpt().then(res=>{
			queryOption.value = res
		})
	})
	const getListData = ()=>{
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getSchool({...params,...queryForm}).then(res=>{
			console.log(res)
			tableData.length = 0
			total.value = res.total
			tableData.push(...res.list)
		})
	}
	const handleEdit = () => {
		dialogEditFormVisible.value = true
	}
	const onSubmit = () => {
		console.log('submit!')
	}
	const handleCurrentChange = (number) => {
		page.value = number
		getListData(page.value)
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData(page.value)
	}
</script>

<style>
</style>
