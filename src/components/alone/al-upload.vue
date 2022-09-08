<template>
	<div class="al-upload" @click="$refs.fileRef.click()">
		<div v-if="!imgUrl">
			+
			<input class="al-upload-input" ref="fileRef" @change="getFile" type="file" name="file" accept>
		</div>
		<div v-else>
			<img :src="imgUrl" alt="" srcset="">
		</div>
	</div>
</template>

<script setup>
	import {ref} from 'vue'
	const imgUrl=ref('')
	const getFile = (e)=>{
		const files = e.target.files
		console.log(e)
		imgUrl=files[0]
		console.log(files)
	}
</script>

<style>
	.al-upload{
		width: 100px;
		height: 100px;
		border: 1px dashed #dcdfe6;
		border-radius: 6px;
		overflow: hidden;
		cursor: pointer;
		z-index: 9;
		position: relative;
	}
	.al-upload-input{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: none;
		z-index: 9999;
	}
</style>