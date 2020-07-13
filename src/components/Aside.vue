<template>
	<div class="aside">
		<!-- <button class="asideBtn" @click="testbtn">三</button> -->
		<!-- <el-button class="asideBtn" @click="testbtn" icon="el-icon-s-fold"></el-button> -->
		<!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;position: absolute;top: -60px;left: 550px;">
			<el-radio-button :label="false">展开</el-radio-button>
			<el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group> -->
		<el-menu default-active="/index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router='true' :unique-opened="true">
			<el-menu-item index="/index">
				<i class="el-icon-s-home"></i>
				<span slot="title">后台首页</span>
			</el-menu-item>
			<el-menu-item index="/manage">
				<i class="el-icon-user-solid"></i>
				<span slot="title">账户管理</span>
			</el-menu-item>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-s-promotion"></i>
					<span slot="title">栏目管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="3-1">栏目列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-s-unfold"></i>
					<span slot="title">内容管理</span>
				</template>
				<el-menu-item-group>	
					<el-menu-item index="/create">发布文章</el-menu-item>
					<el-menu-item index="/article">文章管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="5" route="/about">
				<i class="el-icon-picture"></i>
				<span slot="title">广告管理</span>
			</el-menu-item>
			<el-submenu index="6">
				<template slot="title">
					<i class="el-icon-s-comment"></i>
					<span slot="title">留言管理</span>
				</template>
				<el-menu-item-group>
					<span slot="title">分组一</span>
					<el-menu-item index="6-1">选项1</el-menu-item>
					<el-menu-item index="6-2">选项2</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="7" route="/about">
				<i class="el-icon-s-data"></i>
				<span slot="title">网站统计</span>
			</el-menu-item>
			<el-menu-item index="8" route="/about">
				<i class="el-icon-link"></i>
				<span slot="title">友链管理</span>
			</el-menu-item>
			<el-menu-item index="9" route="/">
				<i class="el-icon-setting"></i>
				<span slot="title">系统设置</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		props: ['isCollapse'],
		data() {
			return {
				// isCollapse: false,
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		}
	}
</script>

<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 250px;
		min-height: 400px;
		
	}
	.asideBtn{position: absolute;top: -60px;left: 250px;background: transparent;border: none;color: #fff;height: 60px;font-size: 20px;outline: none;cursor: pointer;}
	/* .asideBtn:hover{background: transparent;color: #fff;background-color: transparent;} */
	.el-menu{height: 100%;border-right: none;}
	.aside{height: 100%;position: relative;text-align: left;}
	.el-aside{overflow: inherit;box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);}
</style>
