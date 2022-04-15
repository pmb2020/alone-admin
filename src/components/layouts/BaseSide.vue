<template>
	<el-aside width="250px">
		<el-scrollbar>
			<img style="width: 100%;height: 55px;" src="http://cdn.xfrec.com/logo.png" >
			<el-menu :default-openeds="['1', '3']">
				<el-sub-menu index="1">
					<template #title>
						<el-icon>
							<message />
						</el-icon>Navigator One
					</template>
					<el-menu-item-group>
						<template #title>Group 1</template>
						<el-menu-item index="1-1">Option 1</el-menu-item>
						<el-menu-item index="1-2">Option 2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="Group 2">
						<el-menu-item index="1-3">Option 3</el-menu-item>
					</el-menu-item-group>
					<el-sub-menu index="1-4">
						<template #title>Option4</template>
						<el-menu-item index="1-4-1">Option 4-1</el-menu-item>
					</el-sub-menu>
				</el-sub-menu>
				<el-sub-menu index="2">
					<template #title>
						<el-icon>
							<icon-menu />
						</el-icon>Navigator Two
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
						</el-icon>Navigator Three
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

<style>
	.el-aside {
		color: var(--el-text-color-primary);
		background: var(--el-color-primary-light-8);
	}
	.el-menu {
		border-right: none;
	}
</style>
