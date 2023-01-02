<template>
	<div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">学校列表</h3>
				<div>
					<button @click="dialogFormVisible=true" class="ty-btn">新增学校信息</button>
					<button class="ty-btn">导入学校信息</button>
					<button class="ty-btn">下载模版</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column prop="date" label="Date" align="center" width="180" />
				<el-table-column prop="name" label="Name" align="center" />
				<el-table-column prop="address" label="Address" align="center" />
				<el-table-column prop="address" label="Address" align="center" />
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
		</div>
		<!-- 新增弹出 -->
		<el-dialog class="" v-model="dialogFormVisible" title="新增学校信息" destroy-on-close>
			<div>
				新增学校信息
			</div>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog v-model="dialogEditFormVisible" title="编辑学校信息" destroy-on-close>
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
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const form = reactive({
		user: '',
		region: '',
	})
	onMounted(() => {
		getList()
	})
	const getList = ()=>{
		getSchool().then(res=>{
			console.log(res)
		})
	}
	const tableData = reactive([{
			date: '2016-05-03',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
	])
	const dialogFormVisible = ref(false)
	const dialogEditFormVisible = ref(false)
	const handleEdit = () => {
		dialogEditFormVisible.value = true
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
