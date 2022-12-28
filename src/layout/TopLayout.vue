<template>
	<el-container class="is-vertical" style="height: 100%;">
		<BaseHeader style="margin-bottom: 5px;"></BaseHeader>
		<el-container>
			<BaseSide></BaseSide>
			<el-scrollbar class="eee">
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

<style scoped>
	.eee{
		width: 100%;
		height: calc(100vh - var(--al-header-height) - 10px);
	}
</style>
