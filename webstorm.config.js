/**
 * @author Kevin
 * @Date: 2024-4-10
 */
'use strict'
const path = require('path')

module.exports = {
	context: path.resolve(__dirname, './'),
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': path.resolve('src'),
			'@statics': path.resolve(__dirname, 'src/statics'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@comp': path.resolve(__dirname, 'src/renderer/components'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@redux': path.resolve(__dirname, 'src/redux'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@configs': path.resolve(__dirname, 'src/configs'),
		}
	}
}
