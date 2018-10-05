const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { VueLoaderPlugin } = require("vue-loader");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function srcPath(subdirectory) {
	return path.join(__dirname, "src", subdirectory);
}

const isProduction = process.env.NODE_ENV === "production"

const commonConfig = {
	mode: isProduction ? "production" : "development",
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist/"
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
	optimization: {
		minimizer: [new UglifyJsPlugin({
			uglifyOptions: {
				output: {
					comments: false
				},
				compress: {
					unused: true,
					dead_code: true,
					warnings: false,
					drop_debugger: true,
					conditionals: true,
					evaluate: true,
					drop_console: true,
					sequences: true,
					booleans: true
				}
			}
		})]
	},
	plugins: [
		new VueLoaderPlugin(),
		//new BundleAnalyzerPlugin()
	]
};

if(isProduction) {
	commonConfig.devtool = "#source-map";
	commonConfig.resolve.alias.vue$ = "vue/dist/vue.min.js";

	// http://vue-loader.vuejs.org/en/workflow/production.html
	commonConfig.plugins = (commonConfig.plugins || []).concat([
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}

module.exports = [
	merge(commonConfig, {
		entry: "./src/browser.ts",
		output: {
			filename: "browser.js"
		}
	}),
	merge(commonConfig, {
		entry: "./src/index.ts",
		output: {
			filename: "index.js",
			libraryTarget: "umd"
		}
	})
];

