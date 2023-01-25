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
										<el-option v-for="(item,index) in queryOption.classes" :label="item.name"
											:value="item.name" />
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
				<el-table-column prop="base_grade_id" label="年级" align="center" />
				<el-table-column prop="name" label="班级" align="center" />
				<el-table-column prop="address" label="所属老师" align="center" />
				<el-table-column prop="student_num" label="班级人数" align="center" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<router-link :to="'/base/class/info?id='+scope.row.id">查看</router-link>
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
			<div style="margin-top: 30px;display: flex;justify-content: end;">
				<el-pagination :current-page="page" :page-size="pageSize" :background="true"
					:page-sizes="[50, 100, 300, 500]" layout="prev, pager, next,sizes, jumper" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="ty-dialog" width="1000px" v-model="dialogFormVisible" title="新增班级信息" destroy-on-close>
			<AddForm :query-option="queryOption"></AddForm>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog class="ty-dialog" width="600px" v-model="dialogEditFormVisible" title="编辑班级信息" destroy-on-close>
			<el-form :inline="false" :model="form" class="demo-form-inline" label-width="80" size="default"
				:scroll-to-error="true">
				<div class="al-flex" style="">
					<div class="" style="margin-right: 30px;position: relative;left: -20px;">
						<el-form-item label="姓名">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="性别">
							<el-select v-model="form.region" placeholder="请选择">
								<el-option label="男" value="1" />
								<el-option label="女" value="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
					</div>
					<div style="">
						<el-form-item label="归属学校">
							<el-select v-model="form.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="归属片区">
							<el-select v-model="form.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input v-model="form.user" placeholder="请输入" />
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
	import {getClass,addClass,updateClass,getClassOptions} from '@/api/base'
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
	const form = ref({})
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	onMounted(()=>{
		getListData()
		getClassOptions().then(res => {
			queryOption.value = res
		})
	})
	const getListData = ()=>{
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getClass({...params,...queryForm}).then(res=>{
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
