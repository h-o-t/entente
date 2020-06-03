import { extname } from "path";
import { CompilerOptions, Project } from "ts-morph";

/** Returns `true` if it appears to be a configuration file, versus a JavaScript
 * or TypeScript file. Otherwise `false`. */
function isConfig(value: string): boolean {
  return extname(value) === ".json";
}

/** Create a project that can be used to run assertions against. */
export function createProject(root: string): Project {
  const compilerOptions: CompilerOptions = {
    allowJs: true,
    checkJs: true,
    noEmit: true,
    resolveJsonModule: true,
  };

  if (isConfig(root)) {
    return new Project({ compilerOptions, tsConfigFilePath: root });
  }

  const project = new Project({ compilerOptions });
  project.addSourceFileAtPath(root);
  project.resolveSourceFileDependencies();

  return project;
}
