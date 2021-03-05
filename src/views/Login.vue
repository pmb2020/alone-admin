<template>
	<div class="login">
		<div class="login-box">
			<h3>后台管理系统</h3>
			<div class="login-form">
				<el-input placeholder="用户名" autofocus="true" v-model="form.username" clearable></el-input>
				<el-input placeholder="密码" v-model="form.password" show-password></el-input>
				<el-button type="primary" @click="onSubmit">登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {login} from '../others/apis.js'
	export default{
		data(){
			return{
				form :{
					username: 'admin',
					password: '123456'
				},
			}
		},
		methods:{
			onSubmit: function(){
				login(this.form).then(res=>{
					if(res.error_code==0){
						localStorage.setItem('token',res.data.token)
						this.$message({
							message:'登录成功！欢迎您回来！',
							type:'success'
						})
						this.$router.push('/')
					}
				})
			}
		}
	}
</script>

<style>
	.login {
		background-color: #e9eef3;
		height: 100%;
		position: relative;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: flex-start;
	}

	.login-box {
		padding: 30px;
		background-color: #fff;
		width: 300px;
		margin-top: 10%;
		border-radius: 5px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}

	.login-box h3 {
		text-align: center;
		margin: 0 0 45px 0;
	}
	.login-form .el-input{
		margin-bottom: 30px;
	}
	.login-form .el-button{
		width: 100%;
	}
</style>
