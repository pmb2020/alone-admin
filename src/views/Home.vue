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
	// import Footer from '@/components/Footer.vue'
	import Header from '@/components/Header.vue'
	import Aside from '@/components/Aside.vue'
	import {getcity,getUserInfo} from '../apis/test.js'
	export default {
		name: 'Home',
		components: {
			// Footer,
			Header,
			Aside
		},
		data(){
			return {
				isCollapse:false
			}
		},
		mounted() {
			this.checkToken();
			// console.log(getcity);
			console.log(this.$route.meta)
		},
		methods:{
			testbtn(){
				if(this.isCollapse){
					this.isCollapse=false
				}else{
					this.isCollapse=true
				}
			},
			// 验证localStorage存入的token,防止人为制造token，因为路由只验证是否存在
			checkToken(){
				getUserInfo().then(res=>{
					console.log(res.data)
					if(!res.data){
						this.$message({
							message: '身份验证失败！',
							type: 'warning'
						});
						localStorage.setItem('token','')
						// this.$router.push('/login')
					}
				}).catch(err=>{
					console.log('获取信息失败')
					console.log(err)
					localStorage.setItem('token','')
					this.$message({
						message: '出错了！',
						type: 'warning'
					});
				})
				// localStorage.setItem('token','')
				// this.$router.push('/login')
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
