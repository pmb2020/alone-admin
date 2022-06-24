<template>
	<div class="login">
		<p>alone-admin管理系统</p>
		<el-form ref="loginFormRef" :model="loginForm" :rules="rules">
			<el-form-item label="账号" prop="username">
				<el-input v-model="loginForm.username" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="loginForm.password" />
			</el-form-item>
			<el-button @click="submitForm">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	import {reactive,ref} from 'vue'
	export default{
		setup() {
			const loginForm = reactive({
				username:'',
				password:''
			})
			const rules = reactive({
				username:[
					{
						required:true,
						message:'请输入账号'
					}
				],
				password:[
					{
						required:true,
						message:'请输入密码'
					}
				],
			})
			
			const loginFormRef=ref({})
			const submitForm = async()=>{
				loginFormRef.value.validate((valid)=>{
					if(valid){
						console.log('验证通过')
					}else{
						console.log('验证不通过')
					}
				})
			}
			
			return {
				loginForm,
				submitForm,
				loginFormRef,
				rules
			}
		}
	}
</script>

<style>
</style>
