// jest.config.js (javascript file)
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/app/main.ts",
    ".mock.ts",
    "coverage",
    "environments",
    "main",
    "polyfills",
    "zone-flags"
  ],
  coverageThreshold: {
    "global": {
      "branches": 20,
      "functions": 20,
      "lines": 20,
      "statements": 20
    }
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup'
};