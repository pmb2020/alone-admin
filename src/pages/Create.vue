<template>
	<div class="article" style="background-color: #fff;">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="分类">
				<el-select v-model="form.region" placeholder="请选择文章类型">
					<el-option label="类型一" value="shanghai"></el-option>
					<el-option label="类型二" value="beijing"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="是否置顶">
				<el-switch v-model="form.is_top"></el-switch>
			</el-form-item>
			<el-form-item label="活动性质">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			
			<el-form-item label="图片上传">
				<el-upload action="uploadImgApi" list-type="picture-card" :on-preview="handlePictureCardPreview"
				:on-remove="handleRemove" :on-success="uploadSuccess" :on-error="uploadError" name="avatar">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>

			<el-form-item label="其它选择">
				<el-radio-group v-model="form.resource">
					<el-radio label="选择一"></el-radio>
					<el-radio label="选择二"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item class="quill-item" label="内容">
				<quill ref="quill"></quill>
			</el-form-item>
			<!-- <quill></quill> -->
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import quill from '../components/QuillEditor.vue'
	export default {
		components: {
			quill
		},
		data() {
			return {
				uploadImgApi:'http://www.larjwt.test/api/upload/image',
				dialogImageUrl: '',
				dialogVisible: false,
				form: {
					title: '',
					content:'',
					is_top: false,
					region: '',
					delivery: false,
					type: [],
					resource: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
				this.form.content=this.$refs.quill.content;
				console.log(this.form);
			},
			uploadError(file){
				console.log('文件上传失败',file)
			},
			uploadSuccess(file){
				console.log('图片文件上传成功啦')
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			}
		}
	}
</script>
<style>
	.quill-item label {
		line-height: 1;
		margin-top: 12px;
	}

	.quill-item .el-form-item__content {
		line-height: 1;
	}
</style>
