#!/usr/bin/env node
/**
 * Maintains `src/vendor/` — the vendored upstream JSX element types that `JSX.IntrinsicElements`
 * is derived from.
 *
 *   node scripts/generate-jsx.mjs            re-sync from npm and rewrite the vendored files
 *   node scripts/generate-jsx.mjs --check    verify the tree matches the manifest (offline)
 *   node scripts/generate-jsx.mjs --check --fetch
 *                                            ...and that the manifest still matches npm
 *
 * `src/vendor/` holds exactly two files: `manifest.json` and the generated `.d.ts` it describes.
 * The manifest is the single input — the version lives there and nowhere else, and both the header
 * of the generated file and the tarball this script fetches are derived from it. To move to a new
 * upstream release, edit `version` in the manifest and run the sync; nothing else is hand-edited.
 *
 * Everything a reader needs to know about the copy — provenance, checksum, licence, how to re-sync,
 * why it is vendored at all — is rendered into that file's header rather than kept in a sibling
 * README, so it travels with the thing it documents and is covered by the same drift check.
 *
 * The vendored body is never modified. Reshaping the upstream happens in `../src/jsx-runtime.ts`,
 * which is the only seam.
 */

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_VENDOR_DIR = resolve(SCRIPT_DIR, "../src/vendor");

/** Replaced by the first line number of the upstream body once the header's length is known. */
const BODY_START = "{{BODY_START}}";

class GenerateJsxError extends Error {}

function sha256(contents) {
  return createHash("sha256").update(contents).digest("hex");
}

function read(path) {
  return readFileSync(path, "utf8");
}

/**
 * Pulls the copyright line out of the upstream licence so it is never transcribed by hand. If
 * upstream restructures its licence this throws rather than silently emitting a header with a
 * missing attribution.
 */
function copyrightFrom(licence) {
  const line = licence
    .split("\n")
    .find((candidate) => /^copyright\s*\(c\)/i.test(candidate.trim()));
  if (!line) {
    throw new GenerateJsxError("no `Copyright (c) ...` line found in the upstream licence");
  }
  return line.trim();
}

/**
 * Indents the upstream licence into the JSDoc header. MIT requires the copyright notice and the
 * permission notice to travel with every substantial copy of the Software; carrying them inside the
 * file that *is* the copy satisfies that without a second file to keep in sync or lose.
 */
function renderNotice(licence) {
  return licence
    .trimEnd()
    .split("\n")
    .map((line) => (line.trim() === "" ? " *" : ` *   ${line}`))
    .join("\n");
}

function renderHeader(manifest, copyright) {
  const template = `// oxlint-disable typescript/no-redundant-type-constituents -- see the note below.
/**
 * VENDORED — DO NOT EDIT BY HAND.
 *
 * Source:   ${manifest.package}@${manifest.version} — ${manifest.source.types}, as published on npm
 * Project:  ${manifest.repository}
 * License:  ${manifest.license.spdx} — ${copyright}
 * Body:     sha256:${manifest.integrity.types} — no local changes
 *
 * These are the HTML/SVG/MathML element attribute types that \`JSX.IntrinsicElements\` is derived
 * from, through the \`Inklinified<T>\` alias in ../jsx-runtime.ts. That alias is the only place the
 * upstream is reshaped; this file is never edited locally.
 *
 * ---------------------------------------------------------------------------------------------
 * LICENCE
 *
 * The upstream licence, in full. It is reproduced here rather than in a separate file because MIT
 * binds the notice to the copy, and the copy is this file:
 *
${renderNotice(manifest.license.notice)}
 *
 * ---------------------------------------------------------------------------------------------
 * WHAT IS GENERATED
 *
 * This header is generated and everything from line ${BODY_START} onward is byte-identical to the
 * upstream file. The whole of ./ is two files: ./manifest.json and this one. The manifest is the
 * single input — version, filenames, licence text and checksums all live there and nowhere else,
 * and every line above is rendered from it. Editing them here does nothing except fail the check.
 *
 *   pnpm --filter @inkline/core generate:jsx                # re-sync from npm
 *   pnpm --filter @inkline/core generate:jsx:check          # verify nothing has drifted
 *   pnpm --filter @inkline/core generate:jsx:check --fetch  # ...and re-verify against npm
 *
 * To move to a new upstream release: change \`version\` in ./manifest.json — the only hand edit —
 * then run the sync and read \`git diff\`, which will be exactly the upstream change. The gate that
 * says whether the new surface is safe is \`pnpm --filter @inkline/core test\` (the 13-case probe
 * table in ../jsx-runtime.probes.test.ts, which pins the *safety level* of the surface) plus
 * \`vp check\` (the authored .ink.tsx fixtures and the component library). A re-sync that quietly
 * weakens or tightens type-checking fails there instead of drifting.
 *
 * The check also runs as a unit test (../vendor-integrity.test.ts), which additionally proves it
 * bites by running it against tampered copies and requiring a failure. Drift cannot land quietly.
 *
 * ---------------------------------------------------------------------------------------------
 * WHY THIS IS VENDORED RATHER THAN DEPENDED ON
 *
 * \`${manifest.package}\` is a runtime package. Depending on it for types alone would put a framework
 * runtime in \`@inkline/core\`'s dependency tree — a package whose entire purpose is to ship *no*
 * runtime, and whose output erases every \`@inkline/core\` reference. It would install for every
 * consumer, appear in every audit and lockfile, and imply a framework relationship that does not
 * exist: Inkline compiles *to* Solid as one of seven targets; it is not built on it. The element
 * types themselves are just a description of the HTML/SVG/MathML attribute surface — stable,
 * generated upstream from published specs, and no reason to arrive as a runtime package.
 *
 * ---------------------------------------------------------------------------------------------
 * TWO THINGS THAT WILL OTHERWISE CATCH YOU OUT
 *
 * 1. The banner immediately below — \`THIS FILE IS GENERATED BY ./jsx-update.mjs. PLEASE UPDATE
 *    jsx-h.d.ts INSTEAD AND RUN pnpm jsx-sync-types.\` — belongs to upstream and is copied
 *    verbatim with the rest of the body.
 *    \`jsx-update.mjs\`, \`jsx-h.d.ts\` and \`pnpm jsx-sync-types\` are files and scripts in the Solid
 *    repository. **None of them exist here, and running them is not how this copy is maintained.**
 *    The command for this repository is \`generate:jsx\`, above.
 *
 * 2. The \`oxlint-disable\` on line 1 is the one concession the copy asks for. Upstream writes open
 *    unions as \`"auto" | string\`, which \`no-redundant-type-constituents\` flags 11 times. It
 *    silences \`vp lint\`; \`vp check\`'s type-aware pass reports the same 11 as warnings regardless —
 *    that pass does not honour suppression comments. Both exit 0, so this is noise, not a gate.
 *    This directory is excluded from \`vp fmt\` (\`fmt.ignorePatterns\`, root vite.config.ts) so the
 *    copy stays byte-identical, and deliberately *not* from \`vp lint\`, because that list also
 *    gates the type-check path and this file is the surface under test.
 */
`;

  // The placeholder and its replacement both sit on one line, so substituting it cannot change the
  // line count. That is what lets the header state its own length without anyone maintaining it.
  const headerLines = template.split("\n").length - 1;
  return template.replace(BODY_START, String(headerLines + 1));
}

/**
 * Downloads the published tarball and returns the two files we vendor. Uses `npm pack` rather than
 * a direct registry fetch so the caller's registry, proxy and auth configuration all apply.
 */
function fetchUpstream(manifest) {
  const workdir = mkdtempSync(join(tmpdir(), "inkline-generate-jsx-"));
  try {
    const spec = `${manifest.package}@${manifest.version}`;
    const stdout = execFileSync("npm", ["pack", spec, "--silent", "--pack-destination", workdir], {
      encoding: "utf8",
    });
    const tarball = join(workdir, stdout.trim().split("\n").at(-1).trim());
    execFileSync("tar", ["-xzf", tarball, "-C", workdir]);
    return {
      types: read(join(workdir, "package", manifest.source.types)),
      licence: read(join(workdir, "package", manifest.license.source)),
    };
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

export function sync(vendorDir = DEFAULT_VENDOR_DIR, log = console.log) {
  const manifest = JSON.parse(read(join(vendorDir, "manifest.json")));
  log(`fetching ${manifest.package}@${manifest.version} from npm…`);

  const upstream = fetchUpstream(manifest);
  const copyright = copyrightFrom(upstream.licence);
  const next = {
    ...manifest,
    license: { ...manifest.license, notice: upstream.licence },
    integrity: { types: sha256(upstream.types), license: sha256(upstream.licence) },
  };

  writeFileSync(join(vendorDir, next.output.types), renderHeader(next, copyright) + upstream.types);
  writeFileSync(join(vendorDir, "manifest.json"), `${JSON.stringify(next, null, 2)}\n`);

  log(`wrote ${next.output.types} (body sha256:${next.integrity.types})`);
  return next;
}

/**
 * Reports every way the vendored tree can disagree with its manifest. Offline by default: the
 * manifest's checksums catch a hand-edit to the body, and re-rendering the header byte-for-byte
 * catches a hand-edit to anything the manifest claims — provenance, version, licence notice and the
 * recorded body checksum are all rendered into it, so editing either side of that pair alone fails.
 * `fetch` adds the one thing local state cannot answer: whether the manifest itself still describes
 * what npm publishes.
 */
export function check(vendorDir = DEFAULT_VENDOR_DIR, { fetch = false } = {}) {
  const problems = [];
  const manifest = JSON.parse(read(join(vendorDir, "manifest.json")));

  const licence = manifest.license.notice;
  const licenceHash = sha256(licence);
  if (licenceHash !== manifest.integrity.license) {
    problems.push(
      `the licence notice in the manifest is not the one it records (sha256:${licenceHash}, expected sha256:${manifest.integrity.license})`,
    );
  }

  const copyright = copyrightFrom(licence);
  const expectedHeader = renderHeader(manifest, copyright);
  const file = read(join(vendorDir, manifest.output.types));
  if (!file.startsWith(expectedHeader)) {
    problems.push(
      `${manifest.output.types} has a header that is not the one the manifest generates — re-run \`generate:jsx\` or revert the edit`,
    );
  } else {
    const bodyHash = sha256(file.slice(expectedHeader.length));
    if (bodyHash !== manifest.integrity.types) {
      problems.push(
        `${manifest.output.types} body does not match the manifest (sha256:${bodyHash}, expected sha256:${manifest.integrity.types})`,
      );
    }
  }

  if (fetch) {
    const upstream = fetchUpstream(manifest);
    if (sha256(upstream.types) !== manifest.integrity.types) {
      problems.push(
        `npm now publishes a different ${manifest.source.types} for ${manifest.package}@${manifest.version} than the manifest records`,
      );
    }
    if (sha256(upstream.licence) !== manifest.integrity.license) {
      problems.push(
        `npm now publishes a different ${manifest.source.license} for ${manifest.package}@${manifest.version} than the manifest records`,
      );
    }
  }

  return problems;
}

function main(argv) {
  const flags = new Set(argv);
  const vendorDirFlag = argv.indexOf("--dir");
  const vendorDir = vendorDirFlag === -1 ? DEFAULT_VENDOR_DIR : resolve(argv[vendorDirFlag + 1]);

  if (!flags.has("--check")) {
    sync(vendorDir);
    return 0;
  }

  const problems = check(vendorDir, { fetch: flags.has("--fetch") });
  if (problems.length > 0) {
    console.error("vendored JSX types have drifted:");
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error("\nrun `pnpm --filter @inkline/core generate:jsx` to regenerate them.");
    return 1;
  }

  console.log("vendored JSX types match the manifest.");
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof GenerateJsxError ? `error: ${error.message}` : error);
    process.exitCode = 1;
  }
}
