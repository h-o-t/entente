import { sep as DEFAULT_SEPARATOR } from "path";

/** Try to detect the path seperator from a set of paths. */
function determineSeperator(paths: string[]): string {
  for (const path of paths) {
    const match = /(\/|\\)/.exec(path);
    if (match !== null) {
      return match[0];
    }
  }
  return DEFAULT_SEPARATOR;
}

/** Determine the most common root path for a given set of paths. */
export function commonPath(
  paths: string[],
  sep = determineSeperator(paths)
): string {
  const [first = "", ...remaining] = paths;
  if (first === "" || remaining.length === 0) {
    return "";
  }

  const parts = first.split(sep);

  let endOfPrefix = parts.length;
  for (const path of remaining) {
    const compare = path.split(sep);
    for (let i = 0; i < endOfPrefix; i++) {
      if (compare[i] !== parts[i]) {
        endOfPrefix = i;
      }
    }

    if (endOfPrefix === 0) {
      return "";
    }
  }

  const prefix = parts.slice(0, endOfPrefix).join(sep);
  return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
}
