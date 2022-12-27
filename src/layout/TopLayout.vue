<template>
	<el-container class="is-vertical" style="height: 100%;">
		<BaseHeader></BaseHeader>
		<el-container>
			<BaseSide></BaseSide>
			<el-scrollbar class="" style="width: 100%;height: 92vh;">
				<el-main>
					<router-view v-slot="{ Component }">
						<transition name="fade-transform"  mode="out-in">
							<component :is="Component" />
						</transition>
					</router-view>
				</el-main>
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script setup>
	import BaseSide from '@/layout/BaseSide.vue'
	import BaseHeader from '@/layout/BaseHeader.vue'
</script>

<style>
</style>
