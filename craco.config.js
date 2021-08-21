const CracoLessPlugin = require('craco-less');
const TerserPlugin = require('terser-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
let webpackPlugins = [];
if (isProd) {
	webpackPlugins.push(
		new TerserPlugin({
			terserOptions: {
				compress: {
					pure_funcs: ['console.log'],
				},
			},
		})
	);
}
module.exports = {
	webpack: {
		plugins: [...webpackPlugins],
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': '#4213dc' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
	babel: {
		plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
	},
	presets: ['react-app'],
};
