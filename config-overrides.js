const { addDecoratorsLegacy, disableEsLint, addWebpackAlias, override, addWebpackModuleRule } = require('customize-cra');
const path = require('path');
const marked = require('marked');

const renderer = new marked.Renderer();
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
	addDecoratorsLegacy(),
	disableEsLint(),
	addWebpackAlias({
    ['@']: resolve('src')
	}),
	addWebpackModuleRule({
		test: /\.md$/,
		use: [
			{
				loader: 'html-loader',
			},
			{
				loader: 'markdown-loader',
				options: {
					gfm: true,
					breaks: true,
					renderer
				}
			}
		]
	})
);