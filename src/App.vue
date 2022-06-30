<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	import HelloWorld from './components/HelloWorld.vue'
	import {
		ref
	} from 'vue'
	import {
		Menu as IconMenu,
		Message,
		Setting
	} from '@element-plus/icons-vue'

	const item = {
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	}
	const tableData = ref(Array.from({
		length: 20
	}).fill(item))
</script>

<template>
	<router-view></router-view>
</template>

<style>
	html,body{
		height: 100%;
	}
	#app {
		font-family: var(--el-font-family);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #252631;
		background-color: #F5F7FD;
		height: 100%;
	}
</style>
