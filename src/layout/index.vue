<template>
	<el-container style="height: 100%">
		<BaseSide></BaseSide>
		<el-container class="is-vertical">
			<BaseHeader></BaseHeader>
			<el-scrollbar>
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

<script lang="ts" setup>
	import BaseSide from '@/layout/BaseSide.vue'
	import BaseHeader from '@/layout/BaseHeader.vue'
</script>
