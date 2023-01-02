<template>
	<div class="login">
		<div class="login-box">
			<el-form ref="loginFormRef" :model="loginForm" :rules="rules">
				<h1 style="font-size: 19px;margin-bottom: 30px;color: #3085f5;">丰台区教委智慧体测管理平台</h1>
				<el-form-item prop="LgName" style="margin-bottom: 30px;">
					<el-input v-model="loginForm.LgName" autocomplete size="large"
						placeholder="账号" :prefix-icon="UserFilled" />
				</el-form-item>
				<el-form-item prop="LgPassWord" style="margin-bottom: 30px;">
					<el-input v-model="loginForm.LgPassWord" show-password size="large"
						placeholder="密码" :prefix-icon="Lock" />
				</el-form-item>
				<el-form-item prop="code" style="margin-bottom: 30px;">
					<el-input v-model="loginForm.code" placeholder="验证码" :prefix-icon="MessageBox">
					    <template #append>1234</template>
					</el-input>
				</el-form-item>
				<el-button style="width: 100%;font-size: 18px;border-radius: 10px;" size="large" type="primary" @click="submitForm">立即登录</el-button>
				<p style="text-align: center;color: #888;font-size: 14px;margin: 15px 0 15px 0;">忘记密码</p>
			</el-form>
		</div>
	</div>
</template>

<script setup>
	import {Lock,UserFilled,MessageBox} from '@element-plus/icons-vue'
	import {login} from '@/api/auth.js'
	import {useRouter} from 'vue-router'
	import {useStore} from '@/store/index'
import { ElMessage } from 'element-plus';
	const router = useRouter()
	const store = useStore()
	console.log(store.count)
	console.log(
		import.meta.env)
	store.count++
	const loginForm = reactive({
		LgName: '李老师',
		LgPassWord: '123456'
	})
	const rules = reactive({
		LgName: [{
			required: true,
			message: '请输入账号'
		}],
		LgPassWord: [{
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
					ElMessage.success('登录成功！')
					router.push('/')
				})
			}
		})
	}
</script>

<style>
	.login {
		height: 100vh;
		background-image: url('../assets/images/login-bg.png');
		background-size: 100% 100%;
		display: flex;
		justify-content: end;
		align-items: center;
	}

	.login-box {
		padding: 30px 80px;
		width: 280px;
		margin-right: 100px;
		background-image: url('../assets/images/login-form-bg.png');
		background-size: 100% 100%;
	}
	.login-from-box{
		padding:80px 30px;
	}
</style>
