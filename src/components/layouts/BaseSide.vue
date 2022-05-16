<template>
	<el-aside>
		<el-scrollbar>
			<img style="width: 100%;height: 85px;" src="/src/assets/logo.png">
			<el-menu :default-openeds="['1']" unique-opened>
				<el-menu-item index="1">
					<el-icon>
						<HomeFilled />
					</el-icon>
					<span>首页</span>
				</el-menu-item>
				<el-sub-menu index="2">
					<template #title>
						<el-icon><Document /></el-icon>
						<span>内容管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="2-1">内容一</el-menu-item>
						<el-menu-item index="2-2">内容二</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
				<el-sub-menu index="3">
					<template #title>
						<el-icon>
							<setting />
						</el-icon>系统设置
					</template>
					<el-menu-item-group title="alone-admin">
						<el-menu-item index="3-1">基本设置</el-menu-item>
						<el-menu-item index="3-2">特别设置</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
			</el-menu>
		</el-scrollbar>
	</el-aside>
</template>

<style lang="scss">
	.el-aside {
		color: #fff;
		background-color: $aside-bg;
		width: $aside-width;
	}

	.el-menu {
		border-right: none;
		--el-menu-bg-color: $aside-bg;
		--el-menu-hover-bg-color: $aside-hover-bg;
		--el-menu-text-color: $aside-bg;
	}
</style>
