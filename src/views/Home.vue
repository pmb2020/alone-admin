<template>
	<div class="home">
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-container>
				<el-aside width="250">
					<Aside />
				</el-aside>
				<el-container>
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
</style>
