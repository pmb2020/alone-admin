<template>
	<div class="article">
		<el-card>
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<ul class="list_ul">
						<li v-for="item in articleList" :key="item.id">
							<h2 class="list_title">
								<el-tag type="success" style="margin-right: 10px;">{{item.type}}</el-tag>
								<a target="_blank" href="#">{{item.title}}</a>
							</h2>
							<div class="list_info">
								<div class="list_info_left">
									<span>原创</span>
									<span>{{item.date}}</span>
									<span><i class="el-icon-view"></i>{{item.num}}</span>
								</div>
								<div class="list_info_right">
									<a class="d-none" href="#">编辑</a>
									<a class="del_a" href="#"
										onclick="if(confirm('确定要删除吗？')==false) return false">删除</a>
								</div>
							</div>
						</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="待审核" name="second">Config</el-tab-pane>
				<el-tab-pane label="草稿箱" name="third">Role</el-tab-pane>
				<el-tab-pane label="回收站" name="fourth">Task</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>
<script setup>
	import {getArticle} from '@/api/article'
	const activeName = ref('first')
	const articleList = ref([])
	getArticle().then(res=>{
		articleList.value=res.data
	})
	const handleClick = (tab, event) => {
		console.log(tab, event)
	}
</script>
<style>
	.list_ul li {
		text-align: left;
		margin-bottom: 20px;
		border-bottom: 1px solid #e9e9e9;
		padding-bottom: 15px;
	}
	
	.list_ul li:last-child {
		border-bottom: none;
	}
	
	.list_title {
		font-weight: normal;
		font-size: 16px;
		color: var(--el-text-color-regular);
	}
	
	.list_title a:hover{
		color: var(--el-color-primary);
	}
	.list_info {
		margin-top: 20px;
	}
	
	.list_info:after {
		content: '';
		clear: both;
		display: block;
	}
	
	.list_info_left {
		color: #999;
		font-size: 12px;
		float: left;
	}
	
	.list_info_left span {
		margin-right: 20px;
	}
	
	.list_info_left span i {
		margin-right: 5px;
	}
	
	.list_info_right {
		float: right;
		font-size: 14px;
	}
	
	.list_info_right a {
		color: #349EDF;
		margin-left: 10px;
		display: inline-block;
	}
	
</style>
