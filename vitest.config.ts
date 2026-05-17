import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/vitest_compat.test.ts", "tests/vitest_expect_compat.test.ts"],
  },
  resolve: {
    alias: {
      "@std/path": "./tests/shims/path.ts",
      "@std/path/constants": "./tests/shims/path-constants.ts",
    },
  },
});
