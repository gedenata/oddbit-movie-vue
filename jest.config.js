// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { defaults } = require("jest-config");

module.exports = {
  verbose: true,
  clearMocks: true,
  testEnvironment: "node",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "js"]
};
