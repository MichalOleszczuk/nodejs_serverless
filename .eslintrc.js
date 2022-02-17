module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './test/unit/tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'json-format'],
  extends: [
    'sonarqube',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jest/no-standalone-expect': [
      'error',
      { additionalTestBlockFunctions: ['each.it'] },
    ],
    'import/no-absolute-path': 'off',
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'require-await': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: [
    'coverage/',
    'dist/',
    '.eslintrc.js',
  ],
};
