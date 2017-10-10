const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './app');

const config = {
	entry: [
		'babel-polyfill', APP_DIR + '/jsx/app.jsx'
	],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			}
		]
	}
};

module.exports = config;
