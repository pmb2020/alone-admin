<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="学级">
									<el-select v-model="queryForm.year" placeholder="请选择">
										<el-option v-for="(item,index) in queryOption.years" :label="item"
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
				<h3 class="title" style="margin-bottom: 0;">年级信息列表</h3>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="year" label="学级" align="center" />
				<el-table-column prop="name" label="年级" align="center" />
				<el-table-column prop="student_num" label="年级人数" align="center" />
				<el-table-column label="体测详情" align="center">
					<template #default="scope">
						<!-- <router-link to="#">查看</router-link> -->
						<router-link :to="'/base/grade/info?id='+scope.row.id">查看</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button size="default" @click="guanLian(scope.row)"
							style="border: none;background-color: transparent;">
							关联老师
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
		<!-- 关联 -->
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" title="关联老师"
			destroy-on-close>
			<el-form :model="form" class="demo-form-inline" label-width="80" size="default" :scroll-to-error="true">
				<!-- <template #default>
					<el-dialog v-model="innerVisible" width="30%" title="Inner Dialog" append-to-body />
				</template> -->
				<div class="al-flex" style="">
					<div class="" style="margin-right: 30px;position: relative;left: -20px;">
						<el-form-item label="学级">
							<el-input v-model="form.year" disabled placeholder="" />
						</el-form-item>
						<el-form-item label="关联老师" style="font-weight: bold;">
							<el-popover placement="right" :width="400" trigger="click">
								<template #reference>
									<el-button link type="info">{{checkTeaText}}</el-button>
								</template>
								<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
								 @change="handleCheckAllChange">全选</el-checkbox>
								<el-checkbox-group v-model="form.teacher_ids" @change="handleCheckedTeaChange">
									<el-checkbox v-for="item in teaList" :key="item.id" :label="item.id">
										{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</el-popover>
						</el-form-item>
					</div>
					<div style="">
						<el-form-item label="年级">
							<el-input v-model="form.name" disabled placeholder="" />
						</el-form-item>
						<el-form-item label="状态">
							<el-radio-group v-model="form.status">
								<el-radio label="1">启用</el-radio>
								<el-radio label="0">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
				</div>
				<div style="display: flex;justify-content: center;">
					<el-button @click="dialogFormVisible=false">取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">确认</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {
		getGrade,
		addGrade,
		updateGrade,
		getGradeOptions,
		getTeaList,jointeacher
	} from '@/api/base'
	import AddForm from './AddForm.vue'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const queryForm = reactive({})
	const queryOption = ref({})
	const form = ref({})
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	//选择
	const teaList  = reactive([])
	const checkTeaText = ref('请选择')
	const checkedTea = ref([])
	const checkAll = ref(false)
	const isIndeterminate = ref(true)
	const checkedCities = ref(['Shanghai', 'Beijing'])
	const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
	onMounted(() => {
		getListData()
		getGradeOptions().then(res => {
			queryOption.value = res
		})
		getTeaList().then(res => {
			res.forEach(item=>{
				teaList.push(...item.teacher_list)
			})
		})
	})
	const getListData = () => {
		let params = {
			page: page.value,
			page_size: pageSize.value
		}
		getGrade({
			...params,
			...queryForm
		}).then(res => {
			console.log(res)
			tableData.length = 0
			total.value = res.total
			tableData.push(...res.list)
		})
	}
	const selTeacher = () => {
		console.log('选择')
	}
	const guanLian = (row) => {
		dialogFormVisible.value = true
		form.value = {
			...row
		}
		console.log(row)
	}
	const handleEdit = () => {
		dialogEditFormVisible.value = true
	}
	const onSubmit = () => {
		let params = {
			grade_id:form.value.id,
			status: form.value.status || 1,
			teacher_ids : ''
		}
		if(form.value.teacher_ids){
			params.teacher_ids = form.value.teacher_ids.toString()
		}
		jointeacher(params).then(res=>{
			ElMessage.success('关联成功')
			dialogFormVisible.value = false
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
	const handleCheckAllChange = (val) => {
		console.log(val)
		let ids = teaList.map(item=>{return item.id})
		let names = teaList.map(item=>{return item.name})
		form.value.teacher_ids = val ? ids :[],
		checkTeaText.value = names.toString()
		if(!val){
			checkTeaText.value = '请选择'
		}
		isIndeterminate.value = false
	}
	const handleCheckedTeaChange = (val) =>{
		// checkTeaText.value = val.toString()
		console.log(val)
	}
	const handleCheckedCitiesChange = (value) => {
		console.log(value)
		// const checkedCount = value.length
		// checkAll.value = checkedCount === cities.length
		// isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
	}
</script>

<style>
	.selTea {
		position: absolute;
		left: 0;
		top: 0;
	}
</style>
