import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

require('dotenv').config();

export default {
	input: './src/index.ts',
	output: {
		file: './dist/index.js',
		format: 'cjs'
	},
	plugins: [
		replace({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			"__SERVICE_ACCOUNT_PATH__": JSON.stringify(process.env.GOOGLE_APPLICATION_CREDENTIALS),
		}),
		typescript(),
	],
	external: [
		'cors',
		'express',
		'firebase-admin',
		'firebase-functions',
	]
}