module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': ['eslint:recommended', 'prettier'],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};