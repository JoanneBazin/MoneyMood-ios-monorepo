require("dotenv").config({ path: ".env.test" });

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],
  testMatch: ["**/tests/**/*.test.ts", "**/*.test.ts"],
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/../shared/dist/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  globalSetup: "<rootDir>/src/tests/globalSetup.ts",
  globalTeardown: "<rootDir>/src/tests/globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],

  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  verbose: true,

  maxWorkers: "50%",
  testTimeout: 10000,
};
