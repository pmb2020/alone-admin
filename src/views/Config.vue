<template>
	<div class="config">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="基本设置" name="first">
				<el-form ref="config" :model="config" label-width="120px" style="width: 50%;">
					<el-form-item label="网站标题">
						<el-input v-model="config.title"></el-input>
					</el-form-item>
					<el-form-item label="SEO关键词">
						<el-input v-model="config.keywords"></el-input>
					</el-form-item>
					<el-form-item label="网站描述">
						<el-input type="textarea" v-model="config.description"></el-input>
					</el-form-item>
					<el-form-item label="备案号">
						<el-input v-model="config.record"></el-input>
					</el-form-item>
					<el-form-item label="版权信息">
						<el-input v-model="config.copyright"></el-input>
					</el-form-item>
					<el-form-item size="large">
						<el-button type="primary" @click="onSubmit">立即创建</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="其他设置" name="second">
				<p style="min-height: 300px;">暂无</p>
			</el-tab-pane>
		</el-tabs>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				config: {
					title: '',
					keywords: '',
					description: '',
					copyright: 'Copyright © 2020-present gold404.cn',
					record: '京ICP备xxxxxxxx号'
				}
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			onSubmit() {
				console.log('这是谁的心啊');
				console.log(this.config);
			}
		}
	}
</script>

<style>
	.config {
		background-color: #fff;
		border-radius: 4px;
		padding: 30px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		text-align: left;
	}
</style>
