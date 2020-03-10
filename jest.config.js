// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/*.js'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: [
    '/build',
    '/node_modules/',
    '/src/registerServiceWorker',
    '/src/index'
  ],
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      functions: 60,
      lines: 60,
      branches: 0,
      statements: 60
    }
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  verbose: true
};
