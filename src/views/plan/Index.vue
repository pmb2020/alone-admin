<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-row>
					<el-col :span="20">
						<el-row>
							<el-col :span="6">
								<el-form-item label="计划名称">
									<el-input v-model="queryForm.user" placeholder="请输入内容" />
								</el-form-item>
								<el-form-item label="计划编号">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="计划状态">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="体测对象">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="体测项目">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
								<el-form-item label="计划执行时间">
									<el-input v-model="queryForm.user" placeholder="请输入内容" />
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="学校学段">
									<el-select v-model="queryForm.region" placeholder="请选择">
										<el-option label="Zone one" value="shanghai" />
										<el-option label="Zone two" value="beijing" />
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" style="padding-bottom: 18px;">
						<div
							style="display: flex;align-items: center;justify-content: end;flex-direction: column;height: 100%;">
							<el-button type="primary" style="margin-left: 0;" @click="onSubmit">查询</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ty-box">
			<div class="al-flex-between">
				<h3 class="title" style="margin-bottom: 0;">体测计划列表</h3>
				<div>
					<button @click="isFromAdd=true;dialogFormVisible=true" class="ty-btn">
						<el-icon style="vertical-align: middle;margin-right: 3px;" :size="18"><CirclePlusFilled /></el-icon>
						新增体测计划
					</button>
				</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%;margin-top: 20px;">
				<el-table-column type="index" label="序号" align="center" width="80" />
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
		<!-- 弹框表单 -->
		<el-dialog class="ty-dialog" v-model="dialogFormVisible" :title="isFromAdd ? '新增体测计划' :'编辑体测计划'"
			destroy-on-close>
			<el-form ref="formRef" :model="form" :rules="rules" label-width="80" label-position="left" size="default" :scroll-to-error="true">
				<el-row>
					<el-col :span="6">
						<el-form-item label="计划编号" prop="title">
							<el-input v-model="form.title" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="计划名称" prop="title">
							<el-input v-model="form.title" placeholder="请输入" autocomplete />
						</el-form-item>
						<el-form-item label="体测对象">
							<el-select v-model="form.type" placeholder="请选择">
								<el-option label="淘宝" value="1" key="1" />
								<el-option label="天猫" value="2" key="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="体测项目">
							<el-select v-model="form.type" placeholder="请选择">
								<el-option label="淘宝" value="1" key="1" />
								<el-option label="天猫" value="2" key="2" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" :offset="6">
						<el-row>
							<el-col :span="24">
								<el-form-item label="执行开始时间" label-width="100" prop="title">
									<el-date-picker v-model="form.date" type="date" placeholder="请选择" />
								</el-form-item>
								<el-form-item label="执行结束时间" label-width="100" prop="title">
									<el-date-picker v-model="form.date" type="date" placeholder="请选择" />
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
		reactive
	} from 'vue';
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const isFromAdd = ref(false)
	const form = reactive({
		user: '',
		region: '',
	})
	const rules = reactive({})
	const tableData = reactive([{
		date: '2016-05-03',
		name: 'Tom',
		address: '北京市',
	}])
	const dialogFormVisible = ref(false)
	const handleEdit = () => {
		isFromAdd.value = false
		dialogFormVisible.value = true
	}
	const onSubmit = () => {
		console.log('submit!')
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
