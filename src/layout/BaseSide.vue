<template>
	<div class="base-side">
		<!-- <div class="menu-btn" :class="{'menu-btn-collapse':isCollapse}" @click="isCollapse=isCollapse ? false : true">
			<el-icon :size="25">
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</el-icon>
		</div> -->
		<el-scrollbar class="al-scrollbar">
			<el-menu :default-active="menuRoute" class="el-menu-vertical-demo" :collapse="isCollapse" router
				@open="handleOpen" @close="handleClose">
				<template v-for="(items,index) in menuItems" :key="index">
					<el-menu-item v-if="items.children && items.children.length == 1"
						:index="items.path+'/'+items.children[0].path">
						<!-- <el-icon>
							<component :is="items.children[0].meta.icon"></component>
						</el-icon> -->
						<img class="menu-icon" :src="'./icons/'+items.children[0].meta.image">
						<span>{{items.children[0].meta.title}}</span>
					</el-menu-item>
					<el-sub-menu v-else :index="items.path">
						<template #title>
							<!-- <el-icon>
								<component :is="items.meta.icon"></component>
							</el-icon> -->
							<img class="menu-icon" :src="'./icons/'+items.meta.image">
							<span>{{items.meta.title}}</span>
						</template>
						<!-- 二级菜单 -->
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
	import { watch } from 'vue';
	import {useRoute,useRouter} from 'vue-router';
	import {getMenu} from '@/api/auth'
	const route = useRoute()
	const router = useRouter()
	const isCollapse = ref(false)
	const menuItems = ref([])
	const menuRoute = ref('')
	watch(isCollapse,(n,o)=>{
		console.log('sss' + n)
	})
	onMounted(()=>{
		menuRoute.value = route.path
		getMenu().then(res=>{
			// console.log(res)
			let childrens = []
			res.filter(item=>{
				if(item.children.length>1){
					childrens.push(...item.children)
				}
			})
			// console.log(childrens)
			// res.splice(0,2)
			// console.log(res)
			menuItems.value=router.options.routes.filter(item=>{
				if(item.hidden || test(res,item.name)==-1){
					return false
				}
				if (item.path == '/') {
					item.path = ''
				}
				//处理二级菜单
				if(item.children.length>1){
					item.children.forEach(it=>{
						// console.log(it)
						// console.log(childrens)
						// console.log(test(childrens,it.name),'是否存在')
						if(test(childrens,it.name) == -1){
							it.hidden = true
						}
					})
				}
				// console.log(item.children)
				return true
			})
			console.log(menuItems.value)
		})
		// menuItems.value = router.options.routes.filter((item) => {
			// if (item.path == '/') {
			// 	item.path = ''
			// }
		// 	return !item.hidden
		// })
		// console.log(menuItems.value)
	})
	
	const test = (data=[],val)=>{
		return data.findIndex(item=>{
			return item.name === val
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
		box-shadow: 2px 2px 8px 0px rgba(10,57,255,0.08);
	}
	.al-scrollbar{
		height: calc(100vh - var(--al-header-height) - 10px);
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
	.menu-icon{
		width: 22px;
		height: 22px;
		margin-right: 10px;
	}
</style>
