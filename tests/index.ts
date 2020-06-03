import { run } from "./harness";

import "./project";
import "./assert";
import "./imports";
import "./classes";

(async () => {
  const fails = await run();
  process.exit(fails);
})();
