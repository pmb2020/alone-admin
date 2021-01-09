<template>
	<div id="app">
		<router-view v-if="this.$route.path==='/login'" />
		<el-container v-else>
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
					<el-main class="guncss" style="height: 100%;">
						<router-view/>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	import Aside from '@/components/Aside.vue'
	import Header from '@/components/Header.vue'
	export default {
		components: {
			Aside,Header
		},
		mounted() {
			console.log(this.$route.path)
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		height: 100%;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
	.bread{padding: 15px 30px;background-color: #fff;}
</style>
