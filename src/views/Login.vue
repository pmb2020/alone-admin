<template>
	<div class="login" style="margin: 0 35%;">
		<h1 style="margin: 0;">alone-admin管理系统</h1>
		<el-form ref="loginFormRef" :model="loginForm" :rules="rules">
			<el-form-item label="账号" prop="username">
				<el-input v-model="loginForm.username" autocomplete autofocus />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="loginForm.password" show-password />
			</el-form-item>
			<el-button @click="submitForm">登录</el-button>
		</el-form>
	</div>
</template>

<script setup>
	import {login} from '@/api/auth.js'
	import {reactive,ref} from 'vue'
	import {useRouter} from 'vue-router'
	import {useStore} from '@/store/index'
	const router = useRouter()
	const store = useStore()
	console.log(store.count)
	console.log(import.meta.env)
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
					router.push('/')
				})
			}
		})
	}
</script>

<style>
</style>
