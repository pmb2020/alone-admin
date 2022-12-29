<template>
	<div class="ty-box">
		<h3 class="title">个人中心</h3>
		<el-form class="person-form" ref="formRef" :model="form" label-width="90px" label-position="left">
			<el-row>
				<el-col :span="4">
					<el-form-item label="姓名">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="角色">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="教师ID">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="身份证号">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="所属学校">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
				</el-col>
				<el-col :span="6" :offset="4">
					<el-form-item label="初始密码">
						<el-input v-model="form.title" placeholder="123456" />
					</el-form-item>
					<el-form-item label="新密码">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="确认密码">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
				</el-col>
			</el-row>
			<div style="display: flex;justify-content: center;margin-top: 120px;">
				<el-button>取消</el-button>
				<el-button type="primary" size="default" @click="onSubmit">确认</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
	const form = ref({})
	const onSubmit = ()=>{
		
	}
</script>

<style>
	.person-form{
		padding:20px 8px;
		
	}
	.person-form .el-form-item{
		margin-bottom: 25px;
	}
	.person-form .el-form-item label{
		color: #666;
		/* font-weight: 400; */
	}
</style>
