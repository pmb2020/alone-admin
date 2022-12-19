<template>
	<div>
		<div class="ty-box">
			<el-form :inline="true" :model="queryForm" class="demo-form-inline">
				<el-form-item label="姓名">
					<el-input v-model="queryForm.user" placeholder="请输入内容" />
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="queryForm.user" placeholder="请输入内容" />
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="queryForm.user" placeholder="请输入内容" />
				</el-form-item>
				<el-form-item label="班级">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="学校">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="年级">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item label="老师">
					<el-select v-model="queryForm.region" placeholder="请选择">
						<el-option label="Zone one" value="shanghai" />
						<el-option label="Zone two" value="beijing" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		学生列表
	</div>
</template>

<script setup>
	import {reactive} from 'vue'
	const queryForm = reactive({
		user: '',
		region: '',
	})
	const onSubmit = () => {
	  console.log('submit!')
	}
</script>

<style>
</style>
