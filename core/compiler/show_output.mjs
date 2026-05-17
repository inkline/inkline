import { compileFixture } from "./src/testing/harness.ts";

const result = await compileFixture("ComponentRef", ["vue"]);
const files = result.files["vue"];
if (files) {
  console.log("=== Vue ComponentRef ===");
  console.log(files[0].contents);
}

const resultSolid = await compileFixture("ComponentRef", ["solid"]);
const filesSolid = resultSolid.files["solid"];
if (filesSolid) {
  console.log("\n=== Solid ComponentRef ===");
  console.log(filesSolid[0].contents);
}

const resultSvelte = await compileFixture("ForLoop", ["svelte"]);
const filesSvelte = resultSvelte.files["svelte"];
if (filesSvelte) {
  console.log("\n=== Svelte ForLoop ===");
  console.log(filesSvelte[0].contents);
}

const resultReact = await compileFixture("Conditional", ["react"]);
const filesReact = resultReact.files["react"];
if (filesReact) {
  console.log("\n=== React Conditional ===");
  console.log(filesReact[0].contents);
}
