// there are no `@types` for this module, so providing here
declare module "assertion-error-formatter" {
  export function format(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    options?: {
      colorFns?: {
        diffAdded?: (str: string) => string;
        diffRemoved?: (str: string) => string;
        errorMessage?: (str: string) => string;
        errorStack?: (str: string) => string;
      };
      inlineDiff?: boolean;
    }
  ): string;
}
