<template>
	<div class="aside">
		<i @click="asideClick()" style="font-size: 28px;position: fixed;top: 0;left: 250px;width: 50px;text-align: center;line-height: 60px;color: #ffffff;cursor: pointer;" class="el-icon-s-fold"></i>
		<el-menu default-active="/index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router='true' :unique-opened="true">
			<el-menu-item index="/">
				<i class="el-icon-s-home"></i>
				<span slot="title">后台首页</span>
			</el-menu-item>
			<el-menu-item index="/account">
				<i class="el-icon-user-solid"></i>
				<span slot="title">账户管理</span>
			</el-menu-item>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-s-unfold"></i>
					<span slot="title">内容管理</span>
				</template>
				<el-menu-item-group>	
					<el-menu-item index="/article/edit">写新文章</el-menu-item>
					<el-menu-item index="/article">文章列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="5" route="/article">
				<i class="el-icon-picture"></i>
				<span slot="title">文章管理</span>
			</el-menu-item>
			<el-menu-item index="6" route="/about">
				<i class="el-icon-s-data"></i>
				<span slot="title">网站统计</span>
			</el-menu-item>
			<el-menu-item index="7" route="/about">
				<i class="el-icon-link"></i>
				<span slot="title">友链管理</span>
			</el-menu-item>
			<el-menu-item index="8" route="/config">
				<i class="el-icon-setting"></i>
				<span slot="title">系统配置</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false
			};
		},
		methods: {
			asideClick(){
				this.isCollapse = this.isCollapse ? false : true;
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
				console.log('sas')
				this.isCollapse =true
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		}
	}
</script>

<style>
</style>
