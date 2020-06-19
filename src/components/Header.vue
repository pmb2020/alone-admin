<template>
	<div class="header">
		<div>
			<span>alone-admin</span>
		</div>
		<div>
			<el-dropdown>
				<span class="el-dropdown-link" style="">
					管理员<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人信息</el-dropdown-item>
					<el-dropdown-item>切换账号</el-dropdown-item>
					<el-dropdown-item divided>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span style="margin-left: 15px;font-size: 14px;">前台首页</span>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.header {
		background-color: #009efb;
		line-height: 60px;
		color: #fff;
		display: flex;
		justify-content: space-between;
		padding: 0 30px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #fff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
