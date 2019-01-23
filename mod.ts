import { mkdirSync, args, cwd, run, mkdir, writeFile, exit } from "deno";
import { green, red } from "https://deno.land/x/colors/mod.ts";
import * as tmpl from "./tmpl.ts";

const projectName = args[1];

function createLog(name: string, colors = green) {
  console.log(colors(`CREATE ${name}`));
}

try {
  mkdirSync(projectName);
  init(projectName);
} catch (err) {
  console.error(err);
}

function init(name: string) {
  mkdir(`${name}/.vscode`).then(() => {
    writeFile(
      `${name}/${tmpl.vscodeSettingsPath}`,
      new TextEncoder().encode(tmpl.vscodeSettings)
    )
      .then(() => {
        createLog(tmpl.vscodeSettingsPath);
      })
      .catch(() => {
        createLog(tmpl.vscodeSettingsPath, red);
      });
  });
  writeFile(
    `${name}/${tmpl.gitignorePath}`,
    new TextEncoder().encode(tmpl.gitignore)
  )
    .then(() => {
      createLog(tmpl.gitignorePath);
    })
    .catch(() => {
      createLog(tmpl.gitignorePath, red);
    });
  writeFile(
    `${name}/${tmpl.denolibjsonPath}`,
    new TextEncoder().encode(tmpl.denolibjson)
  )
    .then(() => {
      createLog(tmpl.denolibjsonPath);
    })
    .catch(() => {
      createLog(tmpl.denolibjsonPath, red);
    });
  writeFile(`${name}/${tmpl.modtsPath}`, new TextEncoder().encode(tmpl.modts))
    .then(() => {
      createLog(tmpl.modtsPath);
    })
    .catch(() => {
      createLog(tmpl.modtsPath, red);
    });
  writeFile(
    `${name}/${tmpl.packagejsonPath}`,
    new TextEncoder().encode(tmpl.packagejson)
  )
    .then(() => {
      createLog(tmpl.packagejsonPath);
      run({
        args: ["npm", "i", "typescript", "deno_ls_plugin", "--save-dev"],
        cwd: `${cwd()}/${name}`
      })
        .status()
        .then(status => {
          exit(status.code);
        });
    })
    .catch(() => {
      createLog(tmpl.packagejsonPath, red);
    });
}
