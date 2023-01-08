<template>
	<el-header>
		<div style="margin-left:30px">
			alone-admin后台管理系统
		</div>
		<div class="al-flex" style="align-items: center;">
			<el-avatar style="margin-right: 15px;" src="https://www.gold404.cn/static/index/images/avatar.jpg" />
			<el-dropdown style="cursor: pointer;">
				<span class="el-dropdown-link">
					admin
					<el-icon class="el-icon--right">
						<ArrowDownBold />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>消息</el-dropdown-item>
						<el-dropdown-item @click="loginOut" divided>退出</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</el-header>
</template>

<script setup>
	import {useRouter} from 'vue-router'
	const router = useRouter()
	const loginOut = () =>{
		console.log('退出登录')
		localStorage.removeItem('routes')
		localStorage.removeItem('token')
		window.localStorage.clear()
		router.push('/login')
	}
</script>

<style>
	.el-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		background-color: #fff;
		color: var(--el-text-color-primary);
		height: var(--al-header-height);
		box-shadow: 0px 2px 8px 0px rgba(10,57,255,0.16);
	}
</style>
