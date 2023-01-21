<template>
	<div class="al-flex">
		<div v-if="userType=='edu'" class="ty-box" style="padding: 0;margin-right: 30px;flex: 1;">
			<div style="background-color: #f5f5f5;padding: 15px;">组织架构</div>
			<el-collapse v-model="activeNames">
				<el-collapse-item class="ty-collapse" style="" name="1">
					<template #title>
						<div style="padding: 0 30px;color: #222426;font-size: 15px;">{{organ.name}}</div>
					</template>
					<el-collapse v-for="(item,index) in organ.list" v-model="activeNames1[index]">
						<el-collapse-item class="ty-collapse" style="" name="1">
							<template #title>
								<div style="padding: 0 30px;color: #222426;font-size: 14px;margin-left: 10px;">
									<span>{{Object.keys(item)[0]}}</span>
								</div>
							</template>
							<ul class="single-ul">
								<!-- <p>{{item[Object.keys(item)[0]]}}</p> -->
								<li :class="{'active':index==singleIndex}" v-for="(it,index) in item[Object.keys(item)[0]]" :key="index"
									@click="singleClick(index,it.id)">
									{{it.name}}
								</li>
							</ul>
						</el-collapse-item>
					</el-collapse>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="ty-box" :style="{width: userType==='edu' ? '70%' : '100%'}">
			<h3 class="title">设备信息列表</h3>
			<div class="al-flex-between">
				<div class="al-flex">
					<el-input v-model="keywords" placeholder="请输入" />
					<el-button class="ty-btn" type="primary" size="default" @click="getListData()">查询</el-button>
				</div>
				<div>
					<button @click="isFromEdit=false;form={};dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18">
							<CirclePlusFilled />
						</el-icon>
						新增设备信息
					</button>
					<el-upload class="upload-demo" style="display: inline-block;" :show-file-list="false" name="DeviceFile"
						:action="'https://tiyuapi.nkjwx.com/api/device/fileUpload/?token='+token+'&school_id='+schoolId" 
						:on-success="uploadFileSuccess">
						<button class="ty-btn">导入设备信息</button>
					</el-upload>
					<button class="ty-btn"><a target="_blank" href="https://tiyuapi.nkjwx.com/static/设备导入模板.xlsx">下载模版</a></button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="name" label="学校名称" align="center" />
				<el-table-column prop="device_number" label="设备编号" align="center" />
				<el-table-column prop="purchase_date" label="购入时间" align="center" />
				<el-table-column prop="school_name" label="分配学校" align="center" />
				<el-table-column prop="area" label="片区" align="center" />
				<el-table-column prop="edu_group" label="集团" align="center" />
				<el-table-column label="操作" align="center" width="160">
					<template #default="scope">
						<el-button link @click="handleEdit(scope.row)">编辑</el-button>
						<!-- <el-button link @click="handleDelete(scope.row.id)">删除</el-button> -->
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
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑设备信息' :'新增设备信息'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" class="demo-form-inline" label-width="80"
				:scroll-to-error="true">
				<div class="al-flex">
					<div style="margin-right: 30px;">
						<el-form-item label="设备名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="设备编号" prop="device_number">
							<el-input v-model="form.device_number" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="购入时间" prop="purchase_date">
							<el-date-picker v-model="form.purchase_date" type="date" value-format="YYYY-MM-DD"
								placeholder="请选择" />
						</el-form-item>
					</div>
					<div>
						<el-form-item label="分配学校" prop="school_id">
							<el-select v-model="form.school_id" placeholder="请输入">
								<el-option v-for="item in queryOptionSchool" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
						<el-form-item label="片区" prop="area">
							<el-select v-model="form.area" placeholder="请输入">
							</el-select>
						</el-form-item>
						<el-form-item label="集团" prop="edu_group">
							<el-select v-model="form.edu_group" placeholder="请输入">
							</el-select>
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
	import {getOrgan} from '@/api/user'
	import {
		getDevice,
		addDevice,
		updateDevice,
		getDeviceOption
	} from '@/api/device'
	const userType = ref(localStorage.getItem('usertype'))
	const token = ref(localStorage.getItem('token'))
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const organ = ref({}) //组织架构
	const activeNames = ref(['1'])
	const activeNames1 = ref([])
	const singleIndex = ref(0)
	const schoolId = ref('')
	
	const isFromEdit = ref(false)
	const queryForm = reactive({})
	const keywords = ref('')
	const queryOptionSchool = ref({})
	const formRef = ref(null)
	const form = ref({})
	const rules = reactive({
		name: [{
			required: true,
			message: '必填项'
		}, ],
		device_number: [{
			required: true,
			message: '必填项'
		}],
		purchase_date: [{
			required: true,
			message: '必填项'
		}]
	})
	onMounted(() => {
		getListData()
		getDeviceOption().then(res => {
			console.log(res)
			queryOptionSchool.value = res
		})
		if(userType.value=='edu'){
			getOrgan().then(res=>{
				console.log(res)
				organ.value = res
			})
		}
	})
	const singleClick = (index,id)=>{
		singleIndex.value = index
		schoolId.value = id
		getListData(page.value)
	}
	const getListData = (page = 1) => {
		let params = {
			page: page,
			page_size: pageSize.value
		}
		if(keywords.value){
			params.key = keywords.value
		}
		if(schoolId.value){
			params.school_id = schoolId.value
		}
		getDevice(params).then(res => {
			// console.log(res)
			total.value = res.total
			tableData.length = 0
			tableData.push(...res.list)
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
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const handleEdit = (row) => {
		form.value = {
			...row
		}
		isFromEdit.value = true
		dialogFormVisible.value = true
	}
	const handleDelete = (id) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			deleteSchool({
				id: id
			}).then(res => {
				getListData(page.value)
				ElMessage.success('删除成功')
			})
		})
	}
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return
			if (!isFromEdit.value) {
				addDevice(form.value).then(res => {
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				updateDevice(form.value).then(res => {
					getListData(page.value)
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			}

		})
	}
	//文件上传成功
	const uploadFileSuccess = (val)=>{
		if(val.responseCode==0){
			ElMessage.success('修改成功')
		}else{
			ElMessage.error(val.responseMsg)
		}
	}
</script>

<style lang="scss">
	.query-btn {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.ty-collapse {
		// padding: 5px 20px;
		background-color: #F5F5F5;
		.el-collapse-item__header {
			background-color: #fff;
		}

		.el-collapse-item__wrap {
			background-color: #fff;
		}
	}

	.single-ul {
		color: #222426;
		font-size: 14px;

		li {
			cursor: pointer;
			margin: 10px 25px;
			padding: 10px 20px;
		}

		.active {
			box-shadow: 4px 6px 28px 0px rgba(10, 57, 255, 0.16);
			border-radius: 12px;
		}
	}
</style>
