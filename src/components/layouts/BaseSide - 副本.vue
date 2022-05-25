<template>
	<el-aside>
		<el-radio-group class="asdasd" v-model="isCollapse" style="margin-bottom: 20px">
		    <el-radio-button :label="false">expand</el-radio-button>
		    <el-radio-button :label="true">collapse</el-radio-button>
		  </el-radio-group>
		<el-scrollbar>
			
			<!-- <img style="width: 100%;height: 85px;" src="/src/assets/logo.png"> -->
			<el-menu :default-openeds="['1']" unique-opened :collapse="isCollapse" @open="handleOpen"
			 @close="handleClose">
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
						<el-icon><Document /></el-icon>
						<span>产品管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="3-1">内容一</el-menu-item>
						<el-menu-item index="3-2">内容二</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
				<el-sub-menu index="4">
					<template #title>
						<el-icon><Document /></el-icon>
						<span>资讯管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="4-1">内容一</el-menu-item>
						<el-menu-item index="4-2">内容二</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
				<el-sub-menu index="5">
					<template #title>
						<el-icon><Document /></el-icon>
						<span>消息管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="5-1">内容一</el-menu-item>
						<el-menu-item index="5-2">内容二</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
				<!-- <el-sub-menu index="44">
					<template #title>
						<el-icon>
							<setting />
						</el-icon>产品管理
					</template>
					<el-menu-item-group title="alone-admin">
						<el-menu-item index="44-1">基本设置</el-menu-item>
						<el-menu-item index="44-2">特别设置</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu> -->
			</el-menu>
		</el-scrollbar>
	</el-aside>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="scss">
	.asdasd{
		position: absolute;
		left: $aside-width;
		z-index: 99999;
	}
	.el-aside {
		color: $aside-text-color;
		background-color: #394167;
		font-weight: 600;
		font-size: 14px;
		width: $aside-width;
	}

	.el-menu {
		border-right: none;
		--el-menu-bg-color: $aside-bg;
		--el-menu-hover-bg-color: $aside-hover-bg;
		--el-menu-text-color: $aside-bg;
	}
</style>
