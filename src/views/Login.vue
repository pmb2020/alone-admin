<template>
	<div class="login">
		<h1>后台登录（郡美）</h1>
		<el-form :model="form" :rules="rules" ref="form" label-width="50px" label-position="left" hide-required-asterisk>
			<el-form-item label="账号:" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="密码:" prop="password">
				<el-input v-model="form.password"  show-password></el-input>
			</el-form-item>
			<el-button type="primary" @click="submitForm('form')">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	import {
		login
	} from '../apis/test.js'
	export default {
		data() {
			return {
				form: {
					email: '',
					password:''
				},
				rules: {
					email: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
					],
					password:[{
						required:true,
						message:'密码不能为空'
					}]

				}
			}
		},
		mounted() {
			this.isLogin();
			// console.log(login({email:'wqeqw@qq.com',password:'123456'}))
		},
		methods: {
			submitForm(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						this.toLogin();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			toLogin(){
				login(this.form).then(res => {
					if(res.data.code == 200){
						localStorage.setItem('token', res.data.data.token);
						this.$message({
							message: '登录成功',
							type: 'success'
						});
						this.$router.push('/index');
					}
					
				}).catch(err => {
					this.$message.error('用户名或者密码错误');
				})
			},
			// 判断是否已经登录
			isLogin(){
				let token=localStorage.getItem('token');
				if(token){
					this.$message({
						message: '您已经登录过了哦！',
						type: 'warning'
					});
					this.$router.push('/index')
				}
			}
		}
	}
</script>

<style>
	/* body{background:linear-gradient(to right, #7a82b5, #7fad5c);} */
	.login {
		width: 350px;
		margin: 8% auto;
		background-color: #dee4e2;
		padding: 30px;
		border-radius: 5px;
		box-shadow: 0 2px 12px 0 #ffebeb;
	}

	.login h1 {
		font-size: 1.5em;
		margin-bottom: 40px;
		text-align: center;
	}

	.login .el-button {
		width: 100%;
		margin: 15px 0;
		font-size: 16px;
	}
</style>
