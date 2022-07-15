import path from 'path'
import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
	ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname,'src')

// https://vitejs.dev/config/
export default defineConfig({
	base:'./',
	resolve:{
		alias:{
			'@': pathSrc
		}
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	css: {
		preprocessorOptions: {
			scss:{
				additionalData: '@use "@/styles/element/index.scss" as *;',
			}
		}
	},
	server: {
		port:3000
	},
	build: {
		outDir:'dist',
		cssCodeSplit:true,
	}
})
