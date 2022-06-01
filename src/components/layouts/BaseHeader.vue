<template>
	<el-header>
		<el-avatar style="margin-right: 15px;" src="https://www.gold404.cn/static/index/images/avatar.jpg" />
		<el-dropdown style="cursor: pointer;">
			<span class="el-dropdown-link">
				admin
				<el-icon class="el-icon--right">
					<ArrowDownBold />
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>消息</el-dropdown-item>
					<el-dropdown-item divided>退出</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</el-header>
</template>

<script>
</script>

<style>
	.el-header {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: relative;
		background-color: #fff;
		color: var(--el-text-color-primary);
	}
</style>
