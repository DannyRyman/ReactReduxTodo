var path=require('path');
module.exports={
	context:path.join(__dirname,'Source'),
	entry: ['babel-polyfill', './app'],
	output: {
		path: path.join(__dirname,'dist'),
		filename: "bundle.js"
	},
	module: {
		"loaders":[{
			"test":/\.js$/,
			"loader":"babel-loader",
			"include":path.join(__dirname, 'Source')
		},{
			"test":/\.scss$/,
			"loaders":["style", "css?module"]
		}]
	}  
}