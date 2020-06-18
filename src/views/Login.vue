<template>
	<div class="login">
		<h1>后台登录</h1>
		<el-form ref="form" :model="form" label-width="80px">
			<el-input v-model="form.username" placeholder="用户名"></el-input>
			<el-input type="password" v-model="form.password" placeholder="密码"></el-input>
			<el-button type="primary" @click="onSubmit">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
				console.log('username'+this.form.username)
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
	}
	.login h1{font-size: 1.5em;margin-bottom: 30px;}
	.login .el-input{margin-bottom: 30px;}
	.login .el-button{width: 100%;margin-top: 10px;font-size: 16px;}
</style>
