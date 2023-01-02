import path from 'path'
import {
	defineConfig,loadEnv
} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
	ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
import {
	visualizer
} from "rollup-plugin-visualizer";

const pathSrc = path.resolve(__dirname, 'src')
const lifecycle = process.env.npm_lifecycle_event;
export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'@': pathSrc
		}
	},
	plugins: [
		vue(),
		AutoImport({
			imports:['vue'],
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		lifecycle === "report" ?
		visualizer({
			open: true,
			brotliSize: true,
			filename: "report.html"
		}) :
		null
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@/styles/element/index.scss" as *;',
			}
		}
	},
	server: {
		port: 3001,
		proxy: {
			'/api': {
				target: loadEnv('development', process.cwd()).VITE_API_HOST,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	build: {
		outDir: 'dist',
		cssCodeSplit: true,
		chunkSizeWarningLimit: 1024,
	}
})
