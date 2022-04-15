<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	import HelloWorld from './components/HelloWorld.vue'
	import {
		ref
	} from 'vue'
	import {
		Menu as IconMenu,
		Message,
		Setting
	} from '@element-plus/icons-vue'

	const item = {
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	}
	const tableData = ref(Array.from({
		length: 20
	}).fill(item))
</script>

<template>
	<el-container class="layout-container-demo" style="height: 800px">
		<BaseSide></BaseSide>
		<el-container class="is-vertical">
			<BaseHeader></BaseHeader>
			<el-main>
				<el-scrollbar>
					<el-table :data="tableData">
						<el-table-column prop="date" label="Date" width="140" />
						<el-table-column prop="name" label="Name" width="120" />
						<el-table-column prop="address" label="Address" />
					</el-table>
				</el-scrollbar>
			</el-main>
		</el-container>
	</el-container>
</template>

<style>
	html,
	body,
	#app {
		height: 100%;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.layout-container-demo .toolbar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		right: 20px;
	}
</style>
