/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.ts$": "$1",
    "^@std/path$": "<rootDir>/tests/shims/path.ts",
    "^@std/path/constants$": "<rootDir>/tests/shims/path-constants.ts",
  },
  testMatch: ["**/tests/jest_compat.test.ts", "**/tests/jest_expect_compat.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true, tsconfig: "<rootDir>/tsconfig.jest.json" }],
  },
};
