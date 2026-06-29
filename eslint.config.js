import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  // Base JS rules for all files
  js.configs.recommended,

  // TypeScript rules scoped to .ts and .js files only
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // TypeScript handles undefined references; no-undef produces false positives for DOM types
      'no-undef': 'off',
    },
  },

  // Svelte recommended rules + TypeScript parser for <script lang="ts"> blocks
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      // @typescript-eslint/no-unused-vars crashes on Svelte's AST
      '@typescript-eslint/no-unused-vars': 'off',
      // TypeScript handles undefined references inside Svelte scripts
      'no-undef': 'off',
      // Unused vars in Svelte: warn, but allow _-prefixed names (convention for intentional ignores)
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      // These are Svelte 4 reactive-declaration patterns still valid in Svelte 5 compat mode.
      // Warn rather than error — a future runes migration will clear them.
      'svelte/no-reactive-literals': 'warn',
      'svelte/no-immutable-reactive-statements': 'warn',
      'svelte/no-reactive-reassign': 'warn',
      // Static adapter uses base: "" so resolve() is not required for internal hrefs
      'svelte/no-navigation-without-resolve': 'off',
      // {@html} is used intentionally with static/server-controlled content, not user input
      'svelte/no-at-html-tags': 'warn',
    },
  },

  // Ignore generated and built artifacts
  {
    ignores: [
      '.svelte-kit/**',
      'build/**',
      'node_modules/**',
      'src/backend-api/**',
    ],
  },
];
