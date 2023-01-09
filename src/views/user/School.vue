<template>
	<div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">学校列表</h3>
				<div>
					<button @click="isFromEdit=false;dialogFormVisible=true" class="ty-btn">新增学校信息</button>
					<button class="ty-btn">导入学校信息</button>
					<button class="ty-btn"><a href="https://tiyuapi.nkjwx.com/static/学校导入模板.xlsx">下载模版</a></button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="id" label="学校编号" align="center" />
				<el-table-column prop="name" label="学校名称" align="center" />
				<el-table-column prop="period" label="学校学段" align="center" />
				<el-table-column prop="area" label="片区" align="center" />
				<el-table-column prop="edu_group" label="集团" align="center" />
				<el-table-column prop="create_at" label="创建时间" align="center" width="180" />
				<el-table-column label="体测详情" align="center" width="80">
					<template #default="scope">
						<router-link to="/base/student/info">查看</router-link>
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
					:page-sizes="[100, 200, 300, 400]" layout="prev, pager, next,sizes, jumper" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>
		<!-- 弹框表单 -->
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromEdit ? '编辑学校信息' :'新增学校信息'" destroy-on-close>
			<el-form :inline="false" :model="form" class="demo-form-inline" label-width="80" size="default" :scroll-to-error="true">
				<el-row :gutter="30">
					<el-col :span="12">
						<el-form-item label="学校名称">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="学校编号">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="购入时间">
							<el-input v-model="form.user" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="备注">
							<el-input v-model="form.user" :rows="3" type="textarea" placeholder="请输入" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属学校">
							<el-select v-model="form.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="分配片区">
							<el-select v-model="form.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item label="分配集团">
							<el-select v-model="form.region" placeholder="请输入">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<div style="display: flex;justify-content: center;">
					<el-button>取消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">确认</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup>
	import {getSchool} from '@/api/user'
	const page = ref(1)
	const pageSize = ref(20)
	const total = ref(0)
	const isFromEdit = ref(false)
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const form = reactive({
		user: '',
		region: '',
	})
	onMounted(() => {
		getListData()
	})
	const getListData = (page=1)=>{
		getSchool({page:page,page_size:pageSize.value}).then(res=>{
			total.value = res.total
			tableData.length=0
			tableData.push(...res.list)
		})
	}
	const handleSizeChange = (number) => {
		pageSize.value=number
		getListData()
	}
	const handleCurrentChange = (number)=>{
		page.value = number
		getListData(number)
	}
	const tableData = reactive([])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const handleEdit = () => {
		isFromEdit.value = true
		dialogFormVisible.value = true
	}
	const onSubmit = () => {
		console.log('submit!')
	}
</script>

<style>
	.query-btn{
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
</style>
