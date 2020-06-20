<template>
	<div class="home">
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-container style="overflow: hidden;">
				<el-aside width="250">
					<Aside />
				</el-aside>
				<el-container>
					<el-breadcrumb class="bread" separator="/">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
						<el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
					</el-breadcrumb>
					<el-main>
						<router-view/>
					</el-main>
					<el-footer>
						<Footer />
					</el-footer>
				</el-container>
			</el-container> 
		</el-container>
		<!-- <Header /> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	</div>
</template>

<script>

	export default {
		name: 'Home',
		components: {
		}
	}
	
</script>
<style>
	.home{height: 100%;}
	.el-header{padding: 0!important;}
	.el-container{height: 100%;}
	.bread{padding: 15px 30px;background-color: #fff;}
</style>
