<script setup>
	import { defineComponent } from 'vue'
	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	const locale = zhCn
</script>

<template>
	<el-config-provider :locale='locale'>
		<router-view></router-view>
	</el-config-provider>
</template>

<style>
	html,body{
		height: 100%;
	}
	#app {
		font-family: var(--el-font-family);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #252631;
		background-color: #F5F7FD;
		height: 100%;
	}
</style>
