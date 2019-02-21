// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "js",
    "json",
    "node"
  ],
};
