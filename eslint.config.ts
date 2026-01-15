import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: globals.browser },
	},
	...tseslint.configs.recommended,
	{
		files: ['**/*.{js,ts}'],
		ignores: ['**/*.js', 'dist/**/*', 'node_modules/**/*'],
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			// 'simple-import-sort/imports': 'error',
			// 'simple-import-sort/exports': 'error',
			// 'unicorn/better-regex': 'warn',
			// 'unicorn/no-process-exit': 'off',
			// 'unicorn/no-array-reduce': 'off',
			// 'unicorn/prevent-abbreviations': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-unused-vars': ['off'],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-function-return-type': ['warn'],
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					useTabs: true,
					semi: true,
					trailingComma: 'all',
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: 'auto',
				},
			],
		},
	},
	eslintPluginPrettierRecommended,
]);

// {
//   files: ['**/*.{ts,tsx}'],
//   rules: {
//     ...prettierPlugin.configs.recommended.rules,
//     ...eslintConfigPrettier.rules,
//   "@typescript-eslint/ban-types": "off",
//       "@typescript-eslint/no-unused-vars": [
//           "off"
//       ],
//       "@typescript-eslint/no-explicit-any": "off",
//       "@typescript-eslint/explicit-function-return-type": [
//           "off"
//       ],
//       "prettier/prettier": [
//           "error",
//           {
//               "singleQuote": true,
//               "useTabs": true,
//               "semi": true,
//               "trailingComma": "all",
//               "bracketSpacing": true,
//               "printWidth": 100,
//               "endOfLine": "auto"
//           }
//       ]
//   },
// },
