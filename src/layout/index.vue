<template>
	<el-container style="height: 100%">
		<BaseSide></BaseSide>
		<el-container class="is-vertical">
			<BaseHeader></BaseHeader>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
	import BaseSide from '@/layout/BaseSide.vue'
	import BaseHeader from '@/layout/BaseHeader.vue'
	
</script>

<style>
</style>