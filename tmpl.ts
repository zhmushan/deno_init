export const vscodeSettings = `{
  "editor.tabSize": 2,
  "typescript.tsdk": "../node_modules/typescript/lib"
}
`;
export const vscodeSettingsPath = ".vscode/settings.json";

export const gitignore = `# compiled output
/dist
/tmp
/out-tsc
/site

# dependencies
/node_modules
yarn.lock

# profiling files
chrome-profiler-events.json
speed-measure-plugin.json

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# misc
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
yarn-error.log
testem.log
/typings

# System Files
.DS_Store
Thumbs.db
`;
export const gitignorePath = ".gitignore";

export const denolibjson = `{
  "name": "",
  "author": "",
  "license": "MIT",
  "repository": "",
  "keywords": [],
  "entry": "mod.ts"
}
`;
export const denolibjsonPath = "denolib.json";

export const modts = `console.log("Hello, World!");
`;
export const modtsPath = "mod.ts";

export const packagejson = `{}
`;
export const packagejsonPath = "package.json";
