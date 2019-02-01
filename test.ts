import { run, readFileSync, exit, remove } from "deno";
import {
  assertEqual,
  test,
  runTests
} from "https://deno.land/x/testing/mod.ts";
import * as tmpl from "./tmpl.ts";

const projectName = "test_project";
test({
  name: "deno init",
  async fn() {
    const status = await run({
      args: [
        "deno",
        "mod.ts",
        "--allow-write",
        "--allow-run",
        "--allow-env",
        "--reload",
        "--recompile",
        projectName
      ]
    }).status();

    if (status.success) {
      assertEqual(
        new TextDecoder().decode(readFileSync(`${projectName}/mod.ts`)),
        tmpl.modts
      );
    }
    await remove(projectName, { recursive: true });
    exit(status.code);
  }
});

runTests();
