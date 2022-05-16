<template>
	<el-header style="text-align: right; font-size: 12px">
		<div class="toolbar">
			<el-dropdown>
				<el-icon :size="20"><UserFilled /></el-icon>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>消息</el-dropdown-item>
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<span>alone-admin</span>
		</div>
	</el-header>
</template>

<script>
</script>

<style>
	.el-header {
		position: relative;
		background-color: #fff;
		color: var(--el-text-color-primary);
	}
</style>
