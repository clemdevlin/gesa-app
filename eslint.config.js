const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const colorMessage =
  'No colour literals outside src/theme/palette.ts. Use a semantic token: useTheme().colors.* / useStyles().';

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*', '.expo/*', 'drizzle/*', 'node_modules/*'] },
  {
    rules: {
      // 1. Colours come from the theme only.
      'no-restricted-syntax': [
        'error',
        { selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]', message: colorMessage },
        { selector: 'Literal[value=/^rgba?\\(/]', message: colorMessage },
        { selector: 'Literal[value=/^hsla?\\(/]', message: colorMessage },
      ],
      // 2. Client code must never import server-only modules.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/server/*', '@/db/*', '**/server/*', '**/db/schema'],
              message: 'Server-only code (src/server, src/db) must not be imported by client code.',
            },
          ],
        },
      ],
    },
  },
  {
    // The palette is the single home for raw colours.
    files: ['src/theme/palette.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  {
    // Server code and API routes may use the database and server modules.
    files: ['src/app/api/**', 'src/server/**', 'src/db/**', 'drizzle.config.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
]);
