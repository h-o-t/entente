import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/vitest_compat.test.ts"],
  },
  resolve: {
    alias: {
      "@std/path": "./tests/jest-shims/path.ts",
      "@std/path/constants": "./tests/jest-shims/path-constants.ts",
    },
  },
});
