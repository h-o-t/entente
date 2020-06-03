import { format } from "assertion-error-formatter";
import * as chalk from "chalk";

/* eslint-disable no-console */

export interface RunReturn {
  /** An array of the results of each of the tests. */
  tests: TestResult[];

  /** The total number of tests executed. */
  count: number;

  /** The total number of tests that failed. */
  fail: number;
}

export interface RunOptions {
  /** If `true` then no output will be logged.  Defaults to `false`. */
  silent?: boolean;
}

/** A test function.  The name of the function will be used for the name of the
 * test. */
export type TestFn = () => Promise<void> | void;

export interface TestSpec {
  /** The name of the test. */
  name: string;

  /** The test function, which can return nothing. */
  fn: TestFn;
}

export interface TestResult {
  /** The name of the test. */
  name: string;

  /** If the test failed or not. */
  fail: boolean;

  /** If failed, a rich formatted string of the error that occured. */
  errorString?: string;
}

/** Queue of tests. */
const testQueue: TestSpec[] = [];

/** A unique ID used when generating names for tests where one isn't
 * supplied. */
let uid = 0;

/** Formatting options for assertion errors. */
const formatOptions = {
  colorFns: {
    diffAdded: chalk.greenBright,
    diffRemoved: chalk.redBright,
    errorMessage: chalk.yellowBright,
    errorStack: chalk.cyanBright
  }
};

/** A guard for return values from tests. */
function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return Boolean(typeof value === "object" && value && "then" in value);
}

/** Default run options. */
const defaultRunOptions: RunOptions = { silent: false };

/**
 * Execute any queued tests, resolving with a summary of the test results.
 *
 *     import { run } from "entente";
 *
 *     (async () => {
 *       const results = await run({ silent: true });
 *       console.log(results);
 *     })();
 */
export async function run(options: RunOptions = {}): Promise<RunReturn> {
  // eslint-disable-next-line prefer-object-spread
  const { silent } = Object.assign({}, defaultRunOptions, options);
  const { length } = testQueue;
  if (!silent) {
    console.log(`\n${chalk.green("Starting...")}\n\n${length} tests to run.\n`);
  }
  let spec: TestSpec | undefined;
  let count = 0;
  let fail = 0;
  const tests: TestResult[] = [];
  while ((spec = testQueue.shift())) {
    count++;
    try {
      const result = spec.fn();
      if (isPromiseLike(result)) {
        // eslint-disable-next-line no-await-in-loop
        await result;
      }
      if (!silent) {
        console.log(
          `[${count}/${length}] - ${chalk.greenBright("pass")} - ${chalk.yellow(
            spec.name
          )}`
        );
      }
      tests.push({
        name: spec.name,
        fail: false
      });
    } catch (e) {
      fail++;
      const errorString = format(e, formatOptions);
      tests.push({
        name: spec.name,
        fail: true,
        errorString
      });
      if (!silent) {
        console.log(
          `[${count}/${length}] - ${chalk.redBright("fail")} - ${chalk.yellow(
            spec.name
          )}\n`
        );
        console.log(`${errorString}\n`);
      }
    }
  }
  if (!silent) {
    console.log(
      `\n${chalk.yellow(
        "Finished."
      )}\n\n${fail} failures out of ${count} tests.\n`
    );
    for (const result of tests) {
      if (result.fail) {
        console.log(chalk.red(`${result.name}:\n`));
        console.log(result.errorString);
      }
    }
  }
  return { tests, count, fail };
}

/**
 * Queue up a test to be run.
 *
 *     import { test } from "entente";
 *
 *     test({
 *       name: "an example test",
 *       fn() {
 *         throw new Error("test fail!");
 *       }
 *     });
 *
 * @param item Either a test function or test specification
 */
export function test(item: TestFn | TestSpec): void {
  testQueue.push(
    typeof item === "function"
      ? {
          name: item.name ?? `test ${++uid}`,
          fn: item
        }
      : item
  );
}
