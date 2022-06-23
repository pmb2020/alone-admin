<template>
	<div>
		<div class="menu-btn" :class="{'menu-btn-collapse':isCollapse}" @click="isCollapse=isCollapse ? false : true">
			<el-icon :size="25">
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</el-icon>
		</div>
		<el-menu :default-active="menuRoute" class="el-menu-vertical-demo" :collapse="isCollapse" router @open="handleOpen" @close="handleClose">
			<template v-for="(items,index) in menuItems" :key="index">
				<el-menu-item v-if="items.children && items.children.length == 1" :index="items.path+'/'+items.children[0].path">
					<el-icon>
						<component :is="items.children[0].meta.icon"></component>
					</el-icon>
					<span>{{items.children[0].meta.title}}</span>
				</el-menu-item>
				<el-sub-menu v-else :index="items.path">
					<template #title>
						<el-icon>
							<component :is="items.meta.icon" ></component>
						</el-icon>
						<span>{{items.meta.title}}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item v-for="(subItem,subIndex) in items.children" :key="subIndex" :index="items.path+'/'+subItem.path">
							{{subItem.meta.title}}
						</el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isCollapse:false,
				menuItems:[],
				menuRoute:''
			}
		},
		watch:{
			isCollapse(n,o){
				console.log('sss'+n)
			}
		},
		mounted() {
			this.menuRoute=this.$route.path
			this.menuItems = this.$router.options.routes.filter((item)=>{
				if(item.path=='/'){
					item.path=''
				}
				return !item.hidden
			})
		},
		methods:{
			handleOpen(){
				
			},
			handleClose(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
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
	.menu-btn-collapse{
		left: 70px;
	}
</style>
