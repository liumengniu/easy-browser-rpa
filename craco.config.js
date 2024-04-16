/**
 * @author Kevin
 * @Date: 2024-4-16
 */
const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const CracoLessPlugin = require("craco-less")

const { whenProd } = require("@craco/craco")

module.exports = {
	devServer: {
		port: 1819,
		open: false
		
	},
	webpack: {
		alias: {
			"@": path.resolve("src"),
			"@statics": path.resolve(__dirname, "src/statics"),
			"@views": path.resolve(__dirname, "src/views"),
			"@comp": path.resolve(__dirname, "src/components"),
			"@services": path.resolve(__dirname, "src/services"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@redux": path.resolve(__dirname, "src/redux"),
			"@styles": path.resolve(__dirname, "src/styles")
		},
		publicPath: "/",
		plugins: [
			// 打压缩包
			...whenProd(() => [
				// new BundleAnalyzerPlugin()
			], [])
		],
		configure: (webpackConfig, { env: webpackEnv, paths }) => {
			webpackConfig.devtool = process.env.NODE_ENV === "development" ? "source-map" : false;
			webpackConfig.entry = path.resolve(__dirname, 'src', 'renderer/entry/index.js')
			webpackConfig.resolve.fallback = {
				"path": false
			};
			webpackConfig.ignoreWarnings = [/Failed to parse source map/]
			webpackConfig.module.rules.push({
				test: /\.(js|mjs|jsx|svg)$/,
				enforce: "pre",
				loader: require.resolve("source-map-loader"),
				resolve: {
					fullySpecified: false
				}
			})
			whenProd(() => {
				webpackConfig.optimization.minimize = true
				webpackConfig.optimization.minimizer.map(plugin => {
					/**
					 * 重写压缩配置 TerserPlugin (这个需要 nginx 配合使用，不然nginx会加载压缩前的文件， nginx 配置后，会加载压缩后的文件)
					 * nginx的gzip配置
					 *     gzip on;
					 *     gzip_buffers 32 4K;
					 *     gzip_comp_level 6;
					 *     gzip_min_length 100;
					 *     gzip_types application/javascript text/css text/xml;
					 *     gzip_disable "MSIE [1-6]\."; #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
					 *     gzip_vary on;
					 */
					if (plugin instanceof TerserPlugin) {
						Object.assign(plugin.options.minimizer.options.compress, {
							drop_debugger: true, // 删除 debugger
							drop_console: true, // 删除 console
							pure_funcs: ["console.log"]
						})
					}
					
					return plugin
				})
				webpackConfig.optimization.runtimeChunk = "single"
				webpackConfig.optimization.splitChunks = {
					...webpackConfig.optimization.splitChunks,
					chunks: "all",
					minSize: 30000,
					maxAsyncRequests: 30,
					maxInitialRequests: 30,
					cacheGroups: {
						defaultVendors: {
							test: /[\\/]node_modules[\\/]/,
							name: "vendors"
						},
						antd: {
							test: /antd/,
							name: "antd",
							priority: 90
						},
						echarts: {
							test: /echarts/,
							name: "echarts",
							priority: 90
						},
						zrender: {
							test: /zrender/,
							name: "zrender",
							priority: 90
						},
						wangeditor: {
							test: /@wangeditor/,
							name: "@wangeditor",
							priority: 90
						},
						lodash: {
							test: /lodash/,
							name: "lodash",
							priority: 90
						},
						moment: {
							test: /moment/,
							name: "moment",
							priority: 90
						},
						base: {
							// 基本框架
							chunks: "all",
							test: /(react|react-dom|react-dom-router)/,
							name: "base",
							priority: 100
						},
						commons: {
							chunks: "all",
							// 将两个以上的chunk所共享的模块打包至commons组。
							minChunks: 2,
							name: "commons",
							priority: 110
						}
					}
				}
			})
			return webpackConfig
		}
	},
	babel: {
		plugins: [
			...whenProd(
				() => [
					["@babel/plugin-proposal-decorators", { legacy: true }]
				],
				[]
			)
		]
	},
	plugins: [{
		plugin: CracoLessPlugin,
	}],
	eslint: {
		enable: false
	}
}
