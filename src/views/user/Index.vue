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
			<h3 class="title">员工列表</h3>
			<div class="al-flex-between">
				<div class="al-flex">
					<el-input v-model="keywords" placeholder="请输入" />
					<el-button class="ty-btn" type="primary" size="default" @click="getListData()">查询</el-button>
				</div>
				<div>
					<button @click="isFromEdit=false;dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18">
							<CirclePlusFilled />
						</el-icon>
						新增员工信息
					</button>
					<el-upload class="upload-demo" style="display: inline-block;" :show-file-list="false" name="UserFile"
						:action="'https://tiyuapi.nkjwx.com/api/user/fileupload/?token='+token+'&school_id='+schoolId" :on-success="uploadFileSuccess">
						<button class="ty-btn">导入员工信息</button>
					</el-upload>
					<button class="ty-btn"><a target="_blank" href="https://tiyuapi.nkjwx.com/static/员工（老师）导入模板.xlsx">下载模版</a></button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="name" label="姓名" align="center" />
				<el-table-column prop="role_id" label="角色" align="center" />
				<el-table-column prop="phone" label="电话" align="center" />
				<el-table-column prop="department" label="部门" align="center" />
				<el-table-column label="状态" align="center" width="150">
					<template #default="scope">
						<span v-if="scope.row.status==1">启用</span>
						<span v-else-if="scope.row.status==0">禁用</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="教师ID" align="center" />
				<el-table-column prop="id_card" label="身份证号" align="center" width="150" />
				<el-table-column label="操作" align="center" width="150">
					<template #default="scope">
						<el-button link @click="handleEdit(scope.row)">编辑</el-button>
						<el-button link @click="handleDelete(scope.row.id)">删除</el-button>
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
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑员工信息' :'新增员工信息'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" label-width="80" label-position="left" size="default"
				:scroll-to-error="true">
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名" prop="name">
							<el-input v-model="form.name" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="工号" prop="username">
							<el-input v-model="form.username" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="手机号码" prop="phone">
							<el-input v-model="form.phone" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="邮箱" prop="mail">
							<el-input v-model="form.mail" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="身份证号" prop="id_card">
							<el-input v-model="form.id_card" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="状态" prop="status">
							<el-switch v-model="form.status" active-value="1" inactive-value="0"
								style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ccc" inline-prompt
								active-text="启用" inactive-text="禁用" />
						</el-form-item>
					</el-col>
					<el-col :span="12" :offset="4">
						<el-row>
							<el-col :span="24">
								<el-form-item label="角色">
									<el-select v-model="form.role_id" placeholder="请选择">
										<el-option v-for="role in selectOption.roles" :label="role.title" :value="role.id" />
									</el-select>
								</el-form-item>
								<el-form-item label="角色标识">
									<el-select v-model="form.usertype" placeholder="请选择">
										<el-option :label="selectOption.usertype['edu']" value="edu" />
										<el-option :label="selectOption.usertype['school']" value="school" />
										<el-option :label="selectOption.usertype['teacher']" value="teacher" />
									</el-select>
								</el-form-item>
								<el-form-item label="选择机构">
									<el-select v-model="form.parent_id" placeholder="请选择">
										<el-option v-for="jigou in selectOption.organizations" :label="jigou.name" :value="jigou.id" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="20">
								<el-form-item label="备注" label-width="100">
									<el-input v-model="form.user" :rows="3" type="textarea" placeholder="请输入" />
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
	import {
		getUser,addUser,updateUser,deleteUser,getSelectOption,getOrgan
	} from '@/api/user'
	const userType = ref(localStorage.getItem('usertype'))
	const token = ref(localStorage.getItem('token'))
	const pageSize = ref(20)
	const total = ref(0)
	const organ = ref({}) //组织架构
	const activeNames = ref(['1'])
	const activeNames1 = ref([])
	const singleIndex = ref(0)
	const schoolId = ref('')
	const selectOption = ref({})
	onMounted(() => {
		getListData()
		getSelectOption().then(res=>{
			// console.log(res)
			selectOption.value = res
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
	const handleCurrentChange = (number) => {
		page.value = number
		getListData(page.value)
	}
	const handleSizeChange = (number) => {
		pageSize.value = number
		getListData(page.value)
	}
	const keywords = ref('')
	const formRef = ref(null)
	const isFromEdit = ref(false)
	const form = ref({})
	const rules = reactive({})
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
		getUser(params).then(res => {
			console.log(res)
			total.value = res.total
			tableData.length = 0
			tableData.push(...res.list)
		})
	}
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return
			if (!isFromEdit.value) {
				addUser(form.value).then(res => {
					getListData(page.value)
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			} else {
				updateUser(form.value).then(res => {
					getListData(page.value)
					dialogFormVisible.value = false
					ElMessage.success('操作成功')
				})
			}
	
		})
	}
	const handleEdit = (row) => {
		form.value = {...row}
		isFromEdit.value = true
		dialogFormVisible.value = true
	}
	const handleDelete = (id) => {
		ElMessageBox.confirm('确认要删除吗', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			deleteUser({id:id}).then(res => {
				getListData(page.value)
				ElMessage.success('删除成功')
			})
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