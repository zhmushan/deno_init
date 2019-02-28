import { green, red } from "https://deno.land/x/colors/mod.ts";
import * as tmpl from "./tmpl.ts";

const projectName = Deno.args[1];

function createLog(name: string, colors = green) {
  console.log(colors(`CREATE ${name}`));
}

try {
  Deno.mkdirSync(projectName);
  init(projectName);
} catch (err) {
  console.error(err);
}

function init(name: string) {
  Deno.mkdir(`${name}/.vscode`).then(() => {
    Deno.writeFile(
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
  const task = Deno.run({ args: ["deno", "--types"], stdout: "piped" });
  task.output().then(async out => {
    Deno.writeFile(`${name}/deno.d.ts`, out)
      .then(() => {
        createLog(`${name}/deno.d.ts`);
      })
      .catch(() => {
        createLog(`${name}/deno.d.ts`, red);
      })
      .finally(() => {
        task.close();
      });
  });
  Deno.writeFile(
    `${name}/${tmpl.gitignorePath}`,
    new TextEncoder().encode(tmpl.gitignore)
  )
    .then(() => {
      createLog(tmpl.gitignorePath);
    })
    .catch(() => {
      createLog(tmpl.gitignorePath, red);
    });
  Deno.writeFile(
    `${name}/${tmpl.denolibjsonPath}`,
    new TextEncoder().encode(tmpl.denolibjson)
  )
    .then(() => {
      createLog(tmpl.denolibjsonPath);
    })
    .catch(() => {
      createLog(tmpl.denolibjsonPath, red);
    });
  Deno.writeFile(
    `${name}/${tmpl.modtsPath}`,
    new TextEncoder().encode(tmpl.modts)
  )
    .then(() => {
      createLog(tmpl.modtsPath);
    })
    .catch(() => {
      createLog(tmpl.modtsPath, red);
    });
  Deno.writeFile(
    `${name}/${tmpl.tsconfigjsonPath}`,
    new TextEncoder().encode(tmpl.tsconfigjson)
  )
    .then(() => {
      createLog(tmpl.tsconfigjsonPath);
    })
    .catch(() => {
      createLog(tmpl.tsconfigjsonPath, red);
    });
  Deno.writeFile(
    `${name}/${tmpl.packagejsonPath}`,
    new TextEncoder().encode(tmpl.packagejson)
  )
    .then(() => {
      createLog(tmpl.packagejsonPath);
      Deno.run({
        args: ["npm", "i", "typescript", "deno_ls_plugin", "--save-dev"],
        cwd: `${Deno.cwd()}/${name}`
      })
        .status()
        .then(status => {
          Deno.exit(status.code);
        });
    })
    .catch(() => {
      createLog(tmpl.packagejsonPath, red);
    });
}
