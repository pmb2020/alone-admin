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
			<el-button @click="submitForm">登录{{store}}</el-button>
		</el-form>
	</div>
</template>

<script setup>
	import {login} from '@/api/auth.js'
	import {reactive,ref} from 'vue'
	import {useStore} from '@/store/index'
	const store = useStore()
	console.log(store.count)
	store.count++
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
		store.increment()
		loginFormRef.value.validate((valid)=>{
			if(valid){
				login(loginForm).then(res=>{
					localStorage.setItem('token',res.token)
					localStorage.removeItem('token')
				})
				console.log('验证通过')
			}else{
				console.log('验证不通过')
			}
		})
	}
</script>

<style>
</style>
