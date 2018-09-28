var path = require("path");
var webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

function srcPath(subdirectory) {
	return path.join(__dirname, "src", subdirectory);
}

module.exports = {
	entry: "./src/main.ts",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist/",
		filename: "build.js"
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				loader: "svg-sprite-loader"
			},
			{
				test: /\.css$/,
				use: [
					"vue-style-loader",
					"css-loader"
				]
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					esModule: true
				}
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: "url-loader",
				options: {
					name: "[name].[ext]?[hash]"
				}
			}
		]
	},
	resolve: {
		alias: {
			vue$: "vue/dist/vue.esm.js",
			assets: srcPath("assets"),
			models: srcPath("models"),
			components: srcPath("components"),
			utils: srcPath("utils"),
			store: srcPath("store")
		},
		extensions: [".ts", ".js", ".vue", ".json"]
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true
	},
	performance: {
		hints: false
	},
	devtool: "#eval-source-map",
	plugins: [
		new VueLoaderPlugin()
	]
};

if(process.env.NODE_ENV === "production") {
	module.exports.devtool = "#source-map";
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: "production"
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}