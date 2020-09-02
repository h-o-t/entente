export const a = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  b() {
    return import("./exportClass");
  },
};
