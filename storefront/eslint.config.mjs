import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import formatjs from 'eslint-plugin-formatjs';

// Native flat config for eslint 9 / eslint-config-next 16. The previous
// FlatCompat bridge broke against the upgraded plugin set (circular config).
// eslint-config-next already bundles the typescript-eslint, react, import and
// jsx-a11y plugins, so we only layer prettier + formatjs and our rule tweaks.
export default defineConfig([
  globalIgnores([
    '**/public/',
    '**/node_modules/',
    '**/.next/',
    '**/.github/',
    '**/dist/',
    '**/.vscode/',
    '**/*.log',
    '**/*.env*local',
    '**/*.tsbuildinfo',
    '**/*.d.ts',
    '**/*.js',
    '**/out/',
  ]),
  ...next,
  prettierRecommended,
  {
    plugins: { formatjs },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          proseWrap: 'always',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },
]);
