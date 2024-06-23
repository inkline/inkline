import nodemon from "nodemon";
import path from "path";
import * as process from "node:process";
export async function watch(baseDir, command = "build") {
  await new Promise((resolve) => {
    nodemon({
      watch: [path.resolve(baseDir, "src")],
      ext: "*",
      script: "",
      exec: `pnpm run ${command}`,
      runOnChangeOnly: true
    }).on("quit", function() {
      resolve();
      process.exit();
    });
  });
}
