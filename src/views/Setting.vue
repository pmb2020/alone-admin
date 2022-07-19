<template>
	<div class="al-box">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="基本设置" name="first">
				<el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="auto" label-position="right"
					size="default">
					<el-form-item label="姓名" prop="username">
						<el-input v-model="loginForm.username" />
					</el-form-item>
					<el-form-item label="电话" prop="password">
						<el-input v-model="loginForm.password" />
					</el-form-item>
					<el-form-item label="状态">
						<el-select v-model="loginForm.region" placeholder="请选择">
							<el-option label="允许" value="1" />
							<el-option label="禁止" value="0" />
						</el-select>
					</el-form-item>
					<el-form-item label="备注" prop="password">
						<el-input type="textarea" v-model="loginForm.note" />
					</el-form-item>
					<el-button @click="submitForm">保存</el-button>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="其他设置" name="second">其他设置</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" setup>
	import {
		ref,
		reactive
	} from 'vue'
	const activeName = ref('first')
	const loginForm = reactive({
		username: '',
		password: '',
		note:'',
		region:''
	})
	const rules = reactive({
		username: [{
			required: true,
			message: '请输入账号'
		}],
	})

	const loginFormRef = ref({})
	const submitForm = async () => {
		// loginFormRef.value.validate((valid:any) => {
		// 	if (valid) {
		// 		console.log('验证通过')
		// 		console.log(loginForm)
		// 	} 
		// })
	}
	const handleClick = (tab:String) => {
		console.log(tab)
	}
</script>

<style>
	.al-body {
		background-color: #fff;
		padding: 20px;
	}

	.demo-tabs {
		min-height: 600px
	}
</style>
