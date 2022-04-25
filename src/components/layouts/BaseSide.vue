<template>
	<el-aside>
		<el-scrollbar>
			<img style="width: 100%;height: 55px;" src="http://cdn.xfrec.com/logo.png">
			<el-menu :default-openeds="['1', '3']">
				<el-menu-item index="1">
					<el-icon>
						<icon-menu />
					</el-icon>
					<span>首页</span>
				</el-menu-item>
				<el-sub-menu index="2">
					<template #title>
						<el-icon>
							<icon-menu />
						</el-icon>设备状态
					</template>
					<el-menu-item-group>
						<template #title>Group 1</template>
						<el-menu-item index="2-1">Option 1</el-menu-item>
						<el-menu-item index="2-2">Option 2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="Group 2">
						<el-menu-item index="2-3">Option 3</el-menu-item>
					</el-menu-item-group>
					<el-sub-menu index="2-4">
						<template #title>Option 4</template>
						<el-menu-item index="2-4-1">Option 4-1</el-menu-item>
					</el-sub-menu>
				</el-sub-menu>
				<el-sub-menu index="3">
					<template #title>
						<el-icon>
							<setting />
						</el-icon>系统设置
					</template>
					<el-menu-item-group>
						<template #title>Group 1</template>
						<el-menu-item index="3-1">Option 1</el-menu-item>
						<el-menu-item index="3-2">Option 2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="Group 2">
						<el-menu-item index="3-3">Option 3</el-menu-item>
					</el-menu-item-group>
					<el-sub-menu index="3-4">
						<template #title>Option 4</template>
						<el-menu-item index="3-4-1">Option 4-1</el-menu-item>
					</el-sub-menu>
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
		height: 100vh;
	}

	.el-menu {
		border-right: none;
		--el-menu-bg-color: $aside-bg;
		--el-menu-hover-bg-color: $aside-hover-bg;
		--el-menu-text-color: $aside-bg;
	}
</style>
