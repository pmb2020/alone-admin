<template>
	<div class="ty-box">
		<h3 class="title">个人中心</h3>
		<el-form class="person-form" ref="formRef" :model="form" label-width="90px" label-position="left">
			<el-row>
				<el-col :span="6">
					<el-form-item label="姓名">
						<el-input v-model="form.name" disabled placeholder="" />
					</el-form-item>
					<el-form-item label="角色">
						<el-input v-model="form.role_name" disabled placeholder="" />
					</el-form-item>
					<el-form-item label="工号">
						<el-input v-model="form.username" disabled placeholder="" />
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="form.phone" disabled placeholder="" />
					</el-form-item>
					<el-form-item label="身份证号">
						<el-input v-model="form.id_card" disabled placeholder="" />
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="form.mail" disabled placeholder="" />
					</el-form-item>
					<el-form-item label="所属学校">
						<el-input v-model="form.school_name" disabled placeholder="" />
					</el-form-item>
				</el-col>
				<el-col :span="6" :offset="3">
					<el-form-item label="初始密码">
						<el-input v-model="form.password" placeholder="123456" />
					</el-form-item>
					<el-form-item label="新密码">
						<el-input v-model="form.new_password" type="password" show-password placeholder="请输入" />
					</el-form-item>
					<el-form-item label="确认密码">
						<el-input v-model="form.verify_password" type="password" show-password placeholder="请输入" />
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
	import {getUserInfo,updateUserPassword} from '@/api/user'
	const form = ref({})
	onMounted(()=>{
		getUserInfo().then(res=>{
			form.value = res
		})
	})
	const onSubmit = ()=>{
		if(!form.value.password || !form.value.new_password){
			return ElMessage.warning('密码不能为空！')
		}
		if(form.value.new_password != form.value.verify_password){
			return ElMessage.warning('两次密码输入不一致！')
		}
		updateUserPassword({
			password:form.value.password,
			new_password:form.value.new_password
		}).then(res=>{
			console.log(res)
			ElMessage.success('密码修改成功！')
		})
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
