<template>
	<div class="article">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label='全部(42)' name="first"></el-tab-pane>
			<el-tab-pane label="待审核(4)" name="second"></el-tab-pane>
			<el-tab-pane label="草稿箱(2)" name="third"></el-tab-pane>
		</el-tabs>
		<!-- <p>{{activeName}}</p> -->
		<ul class="list_ul">
			<li>
				<h2 class="list_title"><a target="_blank" href="http://www.gold404.cn/info/59">分析一下抖音无水印视频解析的实现过程</a></h2>
				<div class="list_info">
					<div class="list_info_left">
						<span>原创</span>
						<span>爱生活</span>
						<span>2020-04-30 16:20:54</span>
						<span><i class="el-icon-view"></i>107</span>
					</div>
					<div class="list_info_right">
						<a class="d-none" href="#">编辑</a>
						<a class="del_a" href="http://www.gold404.cn/admin/article/delete/59" onclick="if(confirm('确定要删除吗？')==false) return false">删除</a>
					</div>
				</div>
			</li>
			<li>
				<h2 class="list_title"><a target="_blank" href="http://www.gold404.cn/info/59">今天接到一个让注销360分期乐账号的电话</a></h2>
				<div class="list_info">
					<div class="list_info_left">
						<span>原创</span>
						<span>爱生活</span>
						<span>2020-04-30 16:20:54</span>
						<span><i class="el-icon-view"></i>107</span>
					</div>
					<div class="list_info_right">
						<a class="d-none" href="#">编辑</a>
						<a class="del_a" href="http://www.gold404.cn/admin/article/delete/59" onclick="if(confirm('确定要删除吗？')==false) return false">删除</a>
					</div>
				</div>
			</li>
			<li>
				<h2 class="list_title"><a target="_blank" href="http://www.gold404.cn/info/59">少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</a></h2>
				<div class="list_info">
					<div class="list_info_left">
						<span>原创</span>
						<span>爱生活</span>
						<span>2020-04-30 16:20:54</span>
						<span><i class="el-icon-view"></i>107</span>
					</div>
					<div class="list_info_right">
						<a class="d-none" href="#">编辑</a>
						<a class="del_a" href="http://www.gold404.cn/admin/article/delete/59" onclick="if(confirm('确定要删除吗？')==false) return false">删除</a>
					</div>
				</div>
			</li>
			<li>
				<h2 class="list_title"><a target="_blank" href="http://www.gold404.cn/info/59">青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</a></h2>
				<div class="list_info">
					<div class="list_info_left">
						<span>原创</span>
						<span>爱生活</span>
						<span>2020-04-30 16:20:54</span>
						<span><i class="el-icon-view"></i>107</span>
					</div>
					<div class="list_info_right">
						<a class="d-none" href="#">编辑</a>
						<a class="del_a" href="http://www.gold404.cn/admin/article/delete/59" onclick="if(confirm('确定要删除吗？')==false) return false">删除</a>
					</div>
				</div>
			</li>
		</ul>
		<el-pagination background layout="prev, pager, next" :total="1000">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first'
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
				// this.activeName='sad'+tab.label
			}
		}
	};
</script>

<style>
</style>
