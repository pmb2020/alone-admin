<template>
	<div class="header">
		<div class="logo-div">
			<p>alone-admin</p>
		</div>
		<div>
			<el-badge :value="2" :is-dot="false" :max="99" class="item">
				<i class="el-icon-bell" style="font-size: 22px;"></i>
			</el-badge>
			<el-dropdown @command="handleCommand" style="margin-left: 20px;">
				<span class="el-dropdown-link">
					管理员<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="1">个人信息</el-dropdown-item>
					<el-dropdown-item command="2">切换账号</el-dropdown-item>
					<el-dropdown-item command="3" divided>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<router-link to="/" style="color: #fff;font-size: 14px;margin-left: 15px;">前台首页</router-link>
		</div>
	</div>
</template>

<script>
	import {
		logout
	} from '../others/apis.js'
	export default {
		methods: {
			handleCommand(command) {
				if (command == 3) {
					logout().then(res => {
						this.$message({
							message:'您已成功退出！',
							type: 'success'
						});
						localStorage.clear()
						this.$router.push('/login')
					})
				}
			}
		}
	}
</script>

<style>
	.el-header {
		background: linear-gradient(to right, #ff9966 0%, #66bfff 100%);
	}

	.header {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		color: #fff;
		padding: 0 30px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #fff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.item {
		cursor: pointer;
	}

	.item sup {
		top: 15px !important;
		padding: 0 4px;
		height: 14px;
		line-height: 14px;
	}
</style>
