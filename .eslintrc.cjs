import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,js,mjs,jsx,tsx,vue}'], // Include TypeScript and Vue files
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },

  // JavaScript rules
  js.configs.recommended,

  // TypeScript rules
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Ensure TypeScript integration
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn'], // Customize TS rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // Vue 3 rules
  ...vue.configs['flat/essential'],

  // Prettier to handle formatting
  prettier,
  skipFormatting, // Skip formatting conflicts with Prettier
];
