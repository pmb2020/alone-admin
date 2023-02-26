<template>
	<div>
		<el-upload class="al-uploader" name="file" :action="uploadUrl"
			:show-file-list="false" :headers="uploadHeader" :on-success="uploadSuccess" >
			<el-image v-if="imgUrl"  style="width: 400px; height: 200px" :src="imgUrl" />
			<el-icon v-else class="al-uploader-icon">
				<Plus />
			</el-icon>
		</el-upload>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	const props = defineProps(['imgUrl'])
	const emit = defineEmits(['upload-success'])
	const uploadUrl = ref('/admin/upload')
	const uploadHeader = ref({
		'Authorization':'Bearer '+ localStorage.getItem('token')
	})
	const imgUrl = ref(props.imgUrl)
	const uploadSuccess = (res,file)=>{
		if(res.code === 0){
			imgUrl.value = res.data.fullPath
			emit('upload-success',res.data.path)
		}else{
			ElMessage.error('上传失败：'+res.msg)
		}
	}
</script>

<style>
</style>