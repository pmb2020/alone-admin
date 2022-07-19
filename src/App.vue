<script setup lang="ts">
	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	const locale = zhCn
</script>

<template>
	<el-config-provider :locale='locale'>
		<router-view></router-view>
	</el-config-provider>
</template>

<style>
	html,body,#app{
		height: 100%;
	}
</style>
