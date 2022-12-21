<template>
	<div style="border: 1px solid #ccc">
		<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
			:mode="mode" />
		<Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
			:mode="mode" @onCreated="handleCreated" />
	</div>
</template>

<script setup>
	import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import {onBeforeUnmount,ref,shallowRef,onMounted} from 'vue'
	import {Editor,Toolbar} from '@wangeditor/editor-for-vue'
	const mode = ref('default') // 或 'simple'
	const {initValue} = defineProps(['initValue'])
	// 编辑器实例，必须用 shallowRef
	const editorRef = shallowRef()
	// 内容 HTML
	const valueHtml = ref(initValue)
	// 模拟 ajax 异步获取内容
	onMounted(() => {
		// setTimeout(() => {
		// 	valueHtml.value = initValue
		// 	console.log(valueHtml.value)
		// }, 1500)
	})
	const toolbarConfig = {}
	const editorConfig = {
		placeholder: '请输入内容...',
		MENU_CONF:{
			uploadImage:{
				server: '/admin/upload/file',
				fieldName: 'file',
				maxFileSize: 5 * 1024 * 1024, // 单个文件的最大体积限制
				customInsert(res,insertFn){
					insertFn(res.data.url)
				},
			},
			insertImage:{
				// 上传图片到编辑器，然后又把图片删除了。此时你可能想要拿到这张删除的图片，在服务器也把图片文件删了
				// 使用 onInsertedImage 来收集所有上传或者插入的图片，记录为 imageList1
				// 最后保存编辑器内容之前，使用 editor.getElemsByType('image') 获取当前编辑器的所有图片，记录为 imageList2
				// 对比 imageList1 和 imageList2 ，两者的差异，就是删除过的图片
				onInsertedImage(imageNode){
					if (imageNode == null) return
					const { src, alt, url, href } = imageNode
					console.log('inserted image', src, alt, url, href)
				}
			}
		}
	}
	// 组件销毁时，也及时销毁编辑器
	onBeforeUnmount(() => {
		const editor = editorRef.value
		if (editor == null) return
		editor.destroy()
	})
	const handleCreated = (editor) => {
		editorRef.value = editor // 记录 editor 实例，重要！
	}
	defineExpose({
		valueHtml
	})
</script>

<style>
</style>
