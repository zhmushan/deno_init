import { run, readFileSync, exit, removeAll } from "deno";
import { assertEqual } from "https://deno.land/x/testing/mod.ts";
import * as tmpl from "./tmpl.ts";

const projectName = "test_project";

let hsStatus = null;
run({ args: ["hs", "-p", "8888"] })
  .status()
  .then(status => {
    hsStatus = status;
  });
setTimeout(() => {
  run({
    args: [
      "deno",
      "http://localhost:8888/mod.ts",
      "--allow-write",
      "--allow-run",
      "--allow-env",
      "--reload",
      "--recompile",
      projectName
    ]
  })
    .status()
    .then(status => {
      if (status.success) {
        assertEqual(
          new TextDecoder().decode(readFileSync(`${projectName}/mod.ts`)),
          tmpl.modts
        );
      }
      removeAll(projectName).then(() => {
        exit(hsStatus);
      });
    });
}, 2000);
