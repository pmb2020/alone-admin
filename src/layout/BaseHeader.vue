<template>
	<el-header>
		<div class="al-flex" style="color: #222426;font-weight: 600;align-items: center;">
			<img style="width: 60px;margin-right: 5px;" src="@/assets/logo.png" alt="">
			<p>体育智慧服务平台</p>
			<p style="margin-left: 80px;font-weight: 500;">北京市丰台区时光小学</p>
		</div>
		<div class="al-flex" style="align-items: center;margin: 0 10px;">
			<el-badge :value="12" type="warning" class="item" style="margin: 0 30px;">
				<img class="al-avatar" style="" src="@/assets/images/message.png" alt="">
			</el-badge>
			<img class="al-avatar" style="margin-right: 5px;" src="@/assets/images/avatar.png" alt="">
			<el-dropdown style="cursor: pointer;">
				<span class="el-dropdown-link">
					admin
					<el-icon class="el-icon--right">
						<ArrowDownBold />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<!-- <el-dropdown-item>消息</el-dropdown-item> -->
						<el-dropdown-item @click="loginOutFun" divided>退出</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</el-header>
</template>

<script setup>
	import {
		useRouter
	} from 'vue-router'
	import {loginOut} from '@/api/auth.js'
	const router = useRouter()
	const loginOutFun = () => {
		console.log('退出登录')
		loginOut().then(res=>{
			console.log(res)
		})
		// localStorage.removeItem('token')
		// router.push('/login')
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
