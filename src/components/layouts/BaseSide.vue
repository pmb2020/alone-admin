<template>
	<div>
		<div class="menu-btn" :class="{'menu-btn-collapse':isCollapse}" @click="isCollapse=isCollapse ? false : true">
			<el-icon :size="25">
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</el-icon>
		</div>
		<el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
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
					<el-icon><GobletSquareFull /></el-icon>
					<span>产品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="3-1">内容一</el-menu-item>
					<el-menu-item index="3-2">内容二</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>
			<el-sub-menu index="4">
				<template #title>
					<el-icon><HotWater /></el-icon>
					<span>资讯管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="4-1">内容一</el-menu-item>
					<el-menu-item index="4-2">内容二</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>
			<el-sub-menu index="5">
				<template #title>
					<el-icon><Lightning /></el-icon>
					<span>消息管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="5-1">内容一</el-menu-item>
					<el-menu-item index="5-2">内容二</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>
			<el-menu-item index="6" disabled>
				<el-icon><Setting /></el-icon>
				<template #title>系统设置</template>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isCollapse:false
			}
		},
		watch:{
			isCollapse(n,o){
				console.log('sss'+n)
			}
		},
		methods:{
			handleOpen(){
				
			},
			handleClose(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
	}
	.menu-btn {
		position: absolute;
		top: 15px;
		left: 250px;
		z-index: 9999;
		cursor: pointer;
		transition: all 0.38s;
	}

	.el-menu {
		border-right: none;
		height: 100%;
	}
	.menu-btn-collapse{
		left: 70px;
	}
</style>
