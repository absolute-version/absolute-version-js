const tseslint = require('typescript-eslint');
const importX = require('eslint-plugin-import-x');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['src/**/*.ts'],
    plugins: {
      'import-x': importX,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-console': 'error',
      'import-x/prefer-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'warn',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'error',
    },
  },
  {
    files: ['src/bin/*.ts'],
    rules: {
      'no-console': 'off',
    },
  }
);
