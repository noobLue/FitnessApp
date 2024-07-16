/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
