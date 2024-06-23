import shell from "shelljs";
import path from "path";
import glob from "fast-glob";
export async function postbuild(baseDir) {
  const srcDir = path.resolve(baseDir, "src");
  shell.cd(baseDir);
  const scssFiles = await glob(path.resolve(srcDir, "**/*.scss"));
  scssFiles.forEach((file) => {
    const destFile = file.replace("src", "lib");
    const destDir = path.dirname(destFile);
    if (!shell.test("-d", destDir)) {
      shell.mkdir("-p", destDir);
    }
    shell.cp(file, destFile);
  });
}
