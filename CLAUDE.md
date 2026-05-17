# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Entente is a convention testing library for JavaScript/TypeScript. It provides a fluent assertion API built on top of [ts-morph](https://ts-morph.com) to introspect and assert against AST nodes (source files, exports, classes, functions, types, etc.). It is published to JSR as `@higher-order-testing/entente`.

## Common Commands

All development tasks run through Deno. Node.js dependencies are managed via Deno’s npm compatibility layer (`nodeModulesDir: "auto"`).

| Task | Command |
|---|---|
| Run Deno tests | `deno test --allow-read tests/api.test.ts` |
| Run Jest tests | `deno task test:jest` |
| Run Vitest tests | `deno task test:vitest` |
| Check (fmt, lint, type-check) | `deno task check` |
| Format code | `deno fmt .` |
| Lint code | `deno lint .` |
| Type-check | `deno check src/**/*.ts tests/api.test.ts` |

Note: `deno task test` references `tests/deno_test.ts`, but the actual Deno test file on disk is `tests/api.test.ts`. Use the direct `deno test` command above or adjust the task.

## Architecture

### Core Layers

1. **Project creation** (`src/project.ts`) — `createProject()` wraps ts-morph `Project` creation from a file path or `tsconfig.json`.
2. **Assertion entry points** (`src/assert.ts`) — Functions like `assertSourceFile()`, `assertClass()`, `assertFunctionLike()`, `assertType()` return wrapper instances for the given AST node.
3. **Node wrappers** (`src/nodes/*.ts`) — 18 classes wrapping ts-morph AST nodes (e.g. `SourceFile`, `Exports`, `FunctionLikeDeclaration`, `Type`, `ClassDeclaration`). Each exposes:
   - **Navigation properties** that return deeper wrappers (e.g. `sourceFile.exports`, `functionLike.parameters`, `type.properties`).
   - **Assertion methods** that throw `AssertionError` if the condition is not met (e.g. `isFunctionLike()`, `isObject()`, `length(n)`, `namedExport(name)`).
4. **Error handling** (`src/assertion_error.ts`) — Custom `AssertionError` with `actual`/`expected`/`showDiff` for test-runner diff support.

### Fluent API Pattern

The library is designed for chaining. Properties navigate deeper into the AST; methods assert and then usually return `this` or a new wrapper:

```ts
assertSourceFile(sf)
  .exports.namedExport("render")
  .length(1)
  .declarations[0].isFunctionLike()
  .parameters.length(1)
  .parameter(0).isObject().isNotOptional();
```

### Key Design Patterns

- **Lazy initialization:** Complex sub-objects (e.g. `.parameters`, `.properties`) are computed on first access and cached.
- **Custom iterators:** Collection wrappers implement `[Symbol.iterator]` to yield wrapped instances (e.g. `Exports`, `ClassDeclarations`).
- **Union type decomposition:** When a type is a union, it is decomposed into its constituents before assertions are checked.
- **All assertions throw:** Every assertion method throws `AssertionError` on failure; no boolean returns.

## Cross-Environment Test Runners

The codebase supports three test runners:

- **Deno native** — `tests/api.test.ts` uses `Deno.test()`.
- **Jest** — `tests/jest_compat.test.ts` with `jest.config.mjs` (ts-jest ESM preset). Aliases `@std/path` to `tests/shims/path.ts` and `tests/shims/path-constants.ts` via `moduleNameMapper`.
- **Vitest** — `tests/vitest_compat.test.ts` with `vitest.config.ts`. Similar shim aliases via `resolve.alias`.

Shims in `tests/shims/` mirror Deno stdlib path APIs so Jest and Vitest can resolve the code under Node.

## CI

`.github/workflows/ci.yml` runs on push/PR to `main`:

1. `deno task check`
2. `deno task test`
3. `deno task test:jest`
4. `deno task test:vitest`

## Important Files

| File | Purpose |
|---|---|
| `src/index.ts` | Public API — re-exports `assert.ts` and `project.ts` |
| `src/assert.ts` | Assertion entry-point functions |
| `src/project.ts` | `createProject()` factory |
| `src/assertion_error.ts` | `AssertionError` class |
| `deno.json` | JSR manifest, Deno tasks, imports, lint/fmt config |
| `tsconfig.json` | TypeScript compiler options (target ES2022, module NodeNext) |
| `jest.config.mjs` | Jest config with ts-jest ESM preset and `@std/path` shims |
| `vitest.config.ts` | Vitest config with `@std/path` shim aliases |
| `package.json` | Minimal npm manifest for Vitest dependency resolution |

## Lint / Format Configuration

- Deno lint uses `recommended` rules.
- Excluded from lint: `**/*.test.ts`, `tests/fixtures/`.
- Deno format uses 120-character line width.
