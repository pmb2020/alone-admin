<template>
	<div class="base-side">
		<div class="menu-btn" :class="{'menu-btn-collapse':isCollapse}" @click="isCollapse=isCollapse ? false : true">
			<el-icon :size="25">
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</el-icon>
		</div>
		<el-scrollbar class="al-scrollbar">
			<el-menu :default-active="menuRoute" class="el-menu-vertical-demo" :collapse="isCollapse" router
				@open="handleOpen" @close="handleClose">
				<template v-for="(items,index) in menuItems" :key="index">
					<el-menu-item v-if="items.children && items.children.length == 1"
						:index="items.path+'/'+items.children[0].path">
						<el-icon>
							<component :is="items.children[0].meta.icon"></component>
						</el-icon>
						<span>{{items.children[0].meta.title}}</span>
					</el-menu-item>
					<el-sub-menu v-else :index="items.path">
						<template #title>
							<el-icon>
								<component :is="items.meta.icon"></component>
							</el-icon>
							<span>{{items.meta.title}}</span>
						</template>
						<el-menu-item-group>
							<template v-for="(subItem,subIndex) in items.children" :key="subIndex">
								<el-menu-item v-if="!subItem.hidden" :index="items.path+'/'+subItem.path">
									{{subItem.meta.title}}
								</el-menu-item>
							</template>
						</el-menu-item-group>
					</el-sub-menu>
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	import {useRouterStore} from '@/store/router'
	const router = useRouter()
	const routerStore = useRouterStore()
	const isCollapse = ref(false)
	const menuItems = reactive([])
	const menuRoute = ref('')
	onMounted(()=>{
		menuRoute.value = router.currentRoute.value.path
		menuItems.push(...handleRouter(router.options.routes))
		if(routerStore.routes.length >0){
			menuItems.push(...handleRouter(routerStore.routes))
		}
	})
	const handleRouter = (routerList)=>{
		return routerList.filter((item) => {
			if (item.path === '/') {
				item.path = ''
			}
			item.hidden=='undefined'
			return !item.hidden
		})
	}
	const handleOpen = ()=>{
		
	}
	const handleClose = ()=>{
		
	}
</script>

<style scoped>
	.base-side{
		background-color: var(--el-menu-bg-color);
	}
	.al-scrollbar{
		/* height: 100vh; */
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		height: 100%;
	}

	.menu-btn {
		position: absolute;
		top: 15px;
		left: 250px;
		z-index: 9999;
		cursor: pointer;
		transition: all 0.38s;
	}

	.el-menu {
		border-right: none;
		height: 100%;
	}

	.menu-btn-collapse {
		left: 70px;
	}
</style>
