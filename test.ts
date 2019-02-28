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
    const status = await Deno.run({
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
        new TextDecoder().decode(Deno.readFileSync(`${projectName}/mod.ts`)),
        tmpl.modts
      );
    }
    await Deno.remove(projectName, { recursive: true });
    Deno.exit(status.code);
  }
});

runTests();
