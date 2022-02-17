module.exports = {
  globalSetup: '<rootDir>/test/unit/setup/globalSetup.ts',
  globalTeardown: '<rootDir>/test/unit/setup/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup/loadResources.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: process.cwd(),
  testRegex: '.*\\.(test|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^nodeJsLayer(.*)$': '<rootDir>/src/lambda-layers/layer/nodejs$1',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/src/express',
    '/src/prism',
    '<rootDir>/src/lambdas/performScreening/modules/worldCheck/sdk',
    '/webpack.config.js',
    '/.eslintrc.js',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
