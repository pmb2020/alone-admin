<template>
	<div class="edit">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="置顶" prop="resource">
				<el-radio-group v-model="ruleForm.resource">
					<el-radio label="是"></el-radio>
					<el-radio label="否"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="分类" prop="region">
				<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="配送" prop="delivery">
				<el-switch v-model="ruleForm.delivery"></el-switch>
			</el-form-item>
			<el-form-item label="标签" prop="type">
				<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="美食" name="type"></el-checkbox>
					<el-checkbox label="运动" name="type"></el-checkbox>
					<el-checkbox label="娱乐" name="type"></el-checkbox>
					<el-checkbox label="游戏" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item class="quill-item" label="内容" prop="desc">
				<QuillEditor ref="quill"></QuillEditor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import QuillEditor from '@/components/QuillEditor.vue'
	export default {
		components: {
			QuillEditor
		},
		data() {
			return {
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
				}
			};
		},
		methods: {
			submitForm(formName) {
				console.log(this.$refs.quill.content)//输出quill编辑器内容
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm)
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) 
			{
				this.$refs.quill.content='';
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>
	.edit {
		background-color: #fff;
		padding: 30px;
		text-align: left;
	}
	.quill-item label {
		line-height: 1;
		margin-top: 12px;
	}
	.quill-item .el-form-item__content{
		line-height: 1;
	}
	.ql-container{min-height: 300px;}
</style>
