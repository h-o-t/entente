import { format } from "assertion-error-formatter";
import * as chalk from "chalk";

/* eslint-disable no-console */

interface TestSpec {
  name: string;
  skip?: boolean | string;
  fn(): Promise<void> | void;
}

const testQueue: TestSpec[] = [];

function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return Boolean(typeof value === "object" && value && "then" in value);
}

const formatOptions = {
  colorFns: {
    diffAdded: chalk.greenBright,
    diffRemoved: chalk.redBright,
    errorMessage: chalk.yellowBright,
    errorStack: chalk.cyanBright,
  },
};

export async function run(): Promise<number> {
  const { length } = testQueue;
  console.log(`\n${chalk.green("Starting...")}\n\n${length} tests to run.\n`);
  let spec: TestSpec | undefined;
  let count = 0;
  let fail = 0;
  while ((spec = testQueue.shift())) {
    count++;
    if (spec.skip) {
      console.log(
        `[${count}/${length}] - ${chalk.yellowBright("skip")}${
          typeof spec.skip === "string" ? ` (${spec.skip})` : ""
        } - ${chalk.yellow(spec.name)}`
      );
    } else {
      try {
        const result = spec.fn();
        if (isPromiseLike(result)) {
          // eslint-disable-next-line no-await-in-loop
          await result;
        }
        console.log(
          `[${count}/${length}] - ${chalk.greenBright("pass")} - ${chalk.yellow(
            spec.name
          )}`
        );
      } catch (e) {
        fail++;
        const errorString = format(e, formatOptions);
        console.log(
          `[${count}/${length}] - ${chalk.redBright("fail")} - ${chalk.yellow(
            spec.name
          )}\n`
        );
        console.log(`${errorString}\n`);
      }
    }
  }
  console.log(
    `\n${chalk.yellow(
      "Finished."
    )}\n\n${fail} failures out of ${count} tests.\n`
  );
  return fail;
}

export function test(spec: TestSpec): void {
  testQueue.push(spec);
}
