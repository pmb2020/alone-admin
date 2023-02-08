<template>
	<el-container class="is-vertical" style="height: 100%;">
		<BaseHeader style="margin-bottom: 5px;"></BaseHeader>
		<el-container>
			<BaseSide></BaseSide>
			<el-scrollbar class="eee">
				<ul class="tiyu-tab">
					<li class="ty-box" v-for="(tabs,index) in tabList" :key="index">
						<router-link style="margin-right: 3px;" :class="{active : route.name==tabs.name}" :to="{name:tabs.name}">{{tabs.title}}</router-link>
						<el-icon v-if="route.name!=tabs.name" @click="removeTab(tabs.name)" :size="14">
						    <Close />
						</el-icon>
					</li>
				</ul>
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
	import {useRoute,useRouter} from 'vue-router';
	import BaseSide from '@/layout/BaseSide.vue'
	import BaseHeader from '@/layout/BaseHeader.vue'
	import { useTabStore } from '@/store/tab'
	const route = useRoute()
	const router = useRouter()
	const tabStore = useTabStore()
	const tabList = ref([])
	onMounted(()=>{
		tabList.value = tabStore.tabList
		// console.log(tabStore.count)
	})
	const removeTab = (name)=>{
		tabList.value=tabStore.removeTabData(name)
	}
</script>

<style lang="scss">
	.eee{
		width: 100%;
		height: calc(100vh - var(--al-header-height) - 10px);
	}
	.tiyu-tab{
		display:flex;
		margin: 15px 0 0 15px;
		font-size: 14px;
		.ty-box{
			margin-bottom: 0;
			padding: 10px 15px;
			border-radius: 10px;
			margin-right: 10px;
			display: flex;
			align-items: center;
			color: #666;
			.active{
				color:#222;
				font-size: 15px;
			}
		}
	}
</style>
