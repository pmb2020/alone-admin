<template>
	<div class="al-body">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="基本设置" name="first">基本设置</el-tab-pane>
			<el-tab-pane label="其他设置" name="second">其他设置</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	const activeName = ref('first')
	const handleClick = (tab,event) => {
	  console.log(tab,event)
	}
</script>

<style>
	.al-body{
		background-color: #fff;
		padding: 20px;
	}
	.demo-tabs{
		min-height:600px
	}
</style>
