// module.exports={
// 	productionSourceMap:false ,//打包不产生未加密的map文件
// 	configureWebpack:{
// 		performance:{
// 			hints:false
// 		}
// 	},
// 	publicPath: process.env.NODE_ENV === 'production'
// 	    ? './'
// 	    : '/'
// }
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './': '/' ,
	productionSourceMap:false ,//打包不产生未加密的map文件
	// outputDir:"dist",
	assetsDir:"static"
}