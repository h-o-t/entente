export class AssertionError extends Error {
  actual?: unknown;
  expected?: unknown;
  showDiff?: boolean;

  constructor(
    message: string,
    props?: { actual?: unknown; expected?: unknown; showDiff?: boolean },
    // deno-lint-ignore ban-types
    ssf?: Function,
  ) {
    super(message);
    this.name = "AssertionError";
    this.actual = props?.actual;
    this.expected = props?.expected;
    this.showDiff = props?.showDiff;
    if (ssf) {
      // @ts-ignore Error.captureStackTrace is Node-specific
      Error.captureStackTrace?.(this, ssf);
    }
  }
}
