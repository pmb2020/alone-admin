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
				<el-container style="flex-direction: column;">
					<el-breadcrumb class="bread" separator="/">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
					</el-breadcrumb>
					<el-main class="guncss">
						<router-view/>
					</el-main>
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
		},
		mounted() {
			console.log('sssssss');
			console.log(this.$route.meta)
		}
	}
	
</script>
<style>
	.home{height: 100%;}
	.el-header{padding: 0!important;}
	.el-container{height: 100%;}
	.bread{padding: 15px 30px;background-color: #fff;}
</style>
