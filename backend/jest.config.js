/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/../shared/dist/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  verbose: true,
};
