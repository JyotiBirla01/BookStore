import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ...reactRecommended,
    files: ['**/*.js', '**/*.jsx'],
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'react/prop-types': 'off'
    }
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        test: 'readable',
        expect: 'readable',
        describe: 'readable',
        it: 'readable'
      }
    }
  }
];