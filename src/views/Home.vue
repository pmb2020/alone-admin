<template>
	<div class="home">
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<button class="asideBtn" style="top: 0;" @click="testbtn">三</button>
			<el-container style="overflow: hidden;">
				<el-aside width="250">
					<Aside :isCollapse="isCollapse" />
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
		data(){
			return {
				isCollapse:false
			}
		},
		mounted() {
			console.log('sssssss');
			console.log(this.$route.meta)
		},
		methods:{
			testbtn(){
				if(this.isCollapse){
					this.isCollapse=false
				}else{
					this.isCollapse=true
				}
			}
		}
	}
	
</script>
<style>
	.home{height: 100%;}
	.el-header{padding: 0!important;}
	.el-container{height: 100%;}
	.bread{padding: 15px 30px;background-color: #fff;}
</style>
