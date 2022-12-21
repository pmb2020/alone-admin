<template>
	<div class="login">
		<el-row class="login-box">
			<el-col :span="12" style="background-color: #dad1f8;height: 100%;">
				<div style="padding: 100px 50px;">
					<img style="width: 100%;" src="@/assets/images/login.svg">
				</div>
			</el-col>
			<el-col class="login-from-box" :span="12">
				<el-form ref="loginFormRef" :model="loginForm" :rules="rules">
					<h1 style="font-size: 24px;margin-bottom: 30px;">alone-admin管理系统</h1>
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" autocomplete size="large"
							placeholder="账号" :prefix-icon="UserFilled" />
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="loginForm.password" show-password  class="w-50 m-2" size="large"
							placeholder="密码" :prefix-icon="Lock" />
					</el-form-item>
					<el-button style="width: 100%;" size="large" type="primary" @click="submitForm">登 录</el-button>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import {
		Lock,UserFilled
	} from '@element-plus/icons-vue'
	import {
		login
	} from '@/api/auth.js'
	import {
		useRouter
	} from 'vue-router'
	import {
		useStore
	} from '@/store/index'
	const router = useRouter()
	const store = useStore()
	console.log(store.count)
	console.log(
		import.meta.env)
	store.count++
	const loginForm = reactive({
		username: 'admin',
		password: '123456'
	})
	const rules = reactive({
		username: [{
			required: true,
			message: '请输入账号'
		}],
		password: [{
			required: true,
			message: '请输入密码'
		}],
	})

	const loginFormRef = ref({})
	const submitForm = async () => {
		store.increment()
		loginFormRef.value.validate((valid) => {
			if (valid) {
				login(loginForm).then(res => {
					localStorage.setItem('token', res.token)
					router.push('/')
				})
			}
		})
	}
</script>

<style>
	.login {
		margin: 0 auto;
		max-width: 55%;
		width: 750px;
		padding-top: 8%;
	}

	.login-box {
		background-color: #fff;
		box-shadow: var(--el-box-shadow);
		height: 400px;
	}
	.login-from-box{
		padding:80px 30px;
	}
</style>
