module.exports = {
	productionSourceMap: false,//编译时不生成map文件，减少文件体积
	devServer: {
		open: true,
		port: 9090
	},
	publicPath: process.env.NODE_ENV === 'production' ?
		'./' :
		'/'
}
