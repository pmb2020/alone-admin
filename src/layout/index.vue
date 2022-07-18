<template>
	<el-container style="height: 100%">
		<BaseSide></BaseSide>
		<el-container class="is-vertical">
			<BaseHeader></BaseHeader>
			<el-scrollbar>
				<el-main>
					<router-view v-slot="{ Component }">
						<transition name="fade-transform" mode="out-in">
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
	import {
		onBeforeRouteUpdate
	} from 'vue-router'
	import {
		ref
	} from 'vue'
	const animation = ref('slide');
	onBeforeRouteUpdate((to, form) => {
		if (to.meta.index > form.meta.index) {
			animation.value = 'slide-left'
		} else {
			animation.value = 'slide-right'
		}
	})
</script>

<style>
	.slide-fade-enter-active {
		transition: all 0.10s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.025s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateX(20px);
		opacity: 0;
	}

	.slide-left-enter-active,
	.slide-left-leave-active,
	.slide-right-enter-active,
	.slide-right-leave-active {
		width: 100%;
		height: 100%;
		will-change: transform;
		transition: all 1s cubic-bezier(.55, 0, .1, 1);
		position: absolute;
		backface-visibility: hidden;
	}

	.slide-right-enter-active {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}

	.slide-right-leave-active {
		opacity: 0;
		transform: translate3d(3%, 0, 0);
	}

	.slide-left-enter-active {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}

	.slide-left-leave-active {
		opacity: 0;
		transform: translate3d(-3%, 0, 0);
	}
</style>
