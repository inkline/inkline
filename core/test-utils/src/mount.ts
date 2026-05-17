import { mkdtempSync, writeFileSync, mkdirSync, rmSync, symlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import type { GeneratedFile, TargetName } from "@inkline/compiler";

export interface MountResult {
  readonly html: string;
  readonly warnings: readonly string[];
}

const MOUNTABLE_TARGETS: ReadonlySet<TargetName> = new Set(["react", "vue", "solid", "svelte"]);

export function isMountable(target: TargetName): boolean {
  return MOUNTABLE_TARGETS.has(target);
}

export async function mountForTarget(
  target: TargetName,
  file: GeneratedFile,
  props?: Record<string, unknown>,
): Promise<MountResult> {
  if (!isMountable(target)) {
    throw new Error(
      `Target "${target}" does not support SSR mounting. Supported: ${[...MOUNTABLE_TARGETS].join(", ")}`,
    );
  }

  const warnings: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

  try {
    const html = await mountViaTempFile(target, file, props);
    return { html, warnings };
  } finally {
    console.warn = origWarn;
  }
}

async function mountViaTempFile(
  target: TargetName,
  file: GeneratedFile,
  props?: Record<string, unknown>,
): Promise<string> {
  const tmp = mkdtempSync(join(tmpdir(), "ink-mount-"));

  try {
    const componentPath = join(tmp, file.path);
    mkdirSync(dirname(componentPath), { recursive: true });
    writeFileSync(componentPath, file.contents, "utf-8");

    const nodeModulesSource = join(process.cwd(), "node_modules");
    const nodeModulesDest = join(tmp, "node_modules");
    if (existsSync(nodeModulesSource) && !existsSync(nodeModulesDest)) {
      symlinkSync(nodeModulesSource, nodeModulesDest, "dir");
    }

    const mountScript = buildMountScript(target, `./${file.path}`, props);
    const mountPath = join(tmp, "__mount__.mjs");
    writeFileSync(mountPath, mountScript, "utf-8");

    const { execFile } = await import("node:child_process");
    const html = await new Promise<string>((resolve, reject) => {
      execFile(
        process.execPath,
        ["--experimental-strip-types", "--experimental-transform-types", mountPath],
        { cwd: tmp, timeout: 15_000 },
        (err, stdout, stderr) => {
          if (err) reject(new Error(`Mount failed for ${target}: ${stderr || err.message}`));
          else resolve(stdout.trim());
        },
      );
    });

    return html;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function buildMountScript(
  target: TargetName,
  componentPath: string,
  props?: Record<string, unknown>,
): string {
  const propsJson = JSON.stringify(props ?? {});

  switch (target) {
    case "react":
      return `
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const el = React.createElement(C, ${propsJson});
process.stdout.write(renderToStaticMarkup(el));
`;
    case "vue":
      return `
import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const app = createSSRApp(C, ${propsJson});
renderToString(app).then(html => process.stdout.write(html));
`;
    case "solid":
      return `
import { renderToString } from "solid-js/web";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const html = renderToString(() => C(${propsJson}));
process.stdout.write(html);
`;
    case "svelte":
      return `
import { render } from "svelte/server";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const result = render(C, { props: ${propsJson} });
process.stdout.write(result.body);
`;
    default:
      throw new Error(`No mount script for target "${target}"`);
  }
}
