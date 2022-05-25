<template>
	<el-header>
		<div class="toolbar">
			<el-dropdown>
				<span class="el-dropdown-link">
					二号小先生
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>消息</el-dropdown-item>
						<el-dropdown-item divided>退出</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
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
