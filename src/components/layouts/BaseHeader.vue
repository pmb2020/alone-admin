<template>
	<el-header style="text-align: right; font-size: 12px">
		<div class="toolbar">
			<el-dropdown>
				<el-icon style="margin-right: 8px; margin-top: 1px">
					<setting />
				</el-icon>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>View</el-dropdown-item>
						<el-dropdown-item>Add</el-dropdown-item>
						<el-dropdown-item>Delete</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<span>Tom</span>
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
