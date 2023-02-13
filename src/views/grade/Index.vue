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
				<el-row>
					<el-col :span="10">
						<el-form-item label="学级">
							<el-input v-model="form.year" disabled placeholder="" />
						</el-form-item>
						<el-form-item label="关联老师" style="font-weight: bold;">
							<el-popover placement="right" :width="450" :visible="popoverVisible" trigger="click">
								<template #reference>
									<el-button style="overflow: hidden;" link type="info" @click="popoverVisible=true">{{checkTeaText || '请选择'}}</el-button>
								</template>
								<div style="padding:10px">
									<p style="font-weight: bold;font-size: 15px;">选择老师</p>
									<div class="al-flex" style="margin: 15px 0;">
										<el-input style="width: 35%;" v-model="popKeyword" placeholder="老师查询" />
										<el-button style="margin-left: 30px;" type="primary" @click="popSearch">查询</el-button>
									</div>
									<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
									 @change="handleCheckAllChange">全选</el-checkbox>
									<el-checkbox-group v-model="form.teacher_ids" @change="handleCheckedTeaChange">
										<el-checkbox v-for="item in teaList" :key="item.id" :label="item.id">
											{{item.name}}</el-checkbox>
									</el-checkbox-group>
									<div style="display: flex;justify-content: end;margin-top: 20px;">
										<el-button @click="popoverVisible=false">取消</el-button>
										<el-button type="primary" size="default" @click="guanlianSubmit">{{checkedBtnText || '确认'}}</el-button>
									</div>
								</div>
							</el-popover>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="1">
						<el-form-item label="年级">
							<el-input v-model="form.name" disabled placeholder="" />
						</el-form-item>
						<el-form-item label="状态">
							<el-radio-group v-model="form.status">
								<el-radio :label="1">启用</el-radio>
								<el-radio :label="0">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
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
	const teaListOrigin = ref([])
	const popKeyword = ref('')
	const popSearch = ()=>{
		if(!popKeyword.value) {
			teaList.length = 0
			return teaList.push(...teaListOrigin.value)
		}
		let res=teaListOrigin.value.filter(item=>{
			return item.name.search(popKeyword.value) != -1
		})
		teaList.length = 0
		teaList.push(...res)
	}
	//选择
	const teaList  = reactive([])
	const checkTeaText = ref('请选择')
	const checkedTea = ref([])
	const checkAll = ref(false)
	const isIndeterminate = ref(true)
	const checkedCities = ref(['Shanghai', 'Beijing'])
	const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
	const popoverVisible = ref(false)
	const checkedBtnText = ref('确认')
	onMounted(() => {
		getListData()
		getGradeOptions().then(res => {
			queryOption.value = res
		})
		getTeaList().then(res => {
			console.log(res)
			res.forEach(item=>{
				teaList.push(...item.teacher_list)
				teaListOrigin.value.push(...item.teacher_list)
			})
			console.log(teaListOrigin.value)
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
			// console.log(res)
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
		let ids = row.teachers.map(item=>{return item.id})
		let names = row.teachers.map(item=>{return item.name})
		checkTeaText.value = names.toString() || '请选择'
		form.value.teacher_ids = ids || []
	}
	//关联老师提交
	const guanlianSubmit = ()=>{
		checkTeaText.value = ''
		if(form.value.teacher_ids.length > 0){
			teaList.map(item=>{
				if(form.value.teacher_ids.indexOf(item.id) != -1){
					checkTeaText.value += item.name + '，'
				}
			})
		}
		console.log(checkTeaText.value)
		popoverVisible.value = false
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
			getListData()
			dialogFormVisible.value = false
		})
	}
	const handleCurrentChange = (number) => {
		page.value = number
		getListData()
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData()
	}
	const handleCheckAllChange = (val) => {
		let ids = teaList.map(item=>{return item.id})
		form.value.teacher_ids = val ? ids :[]
		let teaLength = form.value.teacher_ids.length
		if(teaLength > 0){
			checkedBtnText.value = '确认（已选择' + teaLength + '个老师）'
		}else {
			checkedBtnText.value = ''
		}
		isIndeterminate.value = false
	}
	const handleCheckedTeaChange = (val) =>{
		// checkTeaText.value = val.toString()
		if(val.length > 0){
			checkedBtnText.value = '确认（已选择' + val.length + '个老师）'
		}else{
			checkedBtnText.value = ''
		}
	}
</script>

<style>
	.selTea {
		position: absolute;
		left: 0;
		top: 0;
	}
</style>
