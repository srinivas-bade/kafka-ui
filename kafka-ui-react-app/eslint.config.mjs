import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));

// eslint-config-airbnb and eslint-config-airbnb-typescript only ship eslintrc
// configs, so the shared configs are loaded through FlatCompat. fixupConfigRules
// adapts plugins that still call context APIs removed in ESLint 9/10.
const compat = new FlatCompat({
  baseDirectory,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['src/generated-sources/**'],
  },
  ...fixupConfigRules(
    compat.config({
      plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest-dom/recommended',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
      ],
    })
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.jest,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json', './src/setupTests.ts'],
      },
    },
    rules: {
      'react/no-unused-prop-types': 'off',
      'react/require-default-props': 'off',
      'prettier/prettier': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      // breaks builds as we still have those warns
      'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'import/no-cycle': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/no-relative-parent-imports': 'error',
      'no-debugger': 'warn',
      // keep the pre-ESLint 9 default of not checking caught errors
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'react/jsx-props-no-spreading': 'off',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        },
      ],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-no-constructed-context-values': 'off',
      'react/display-name': 'off',
      // rules removed in @typescript-eslint v8 but still enabled by airbnb-typescript
      '@typescript-eslint/lines-between-class-members': 'off',
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: false,
        },
      ],
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/only-throw-error': 'error',
      // keep the pre-v8 default of not checking caught errors
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          caughtErrors: 'none',
        },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.spec.tsx'],
    rules: {
      'react/jsx-props-no-spreading': 'off',
    },
  },
];
