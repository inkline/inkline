import { existsSync, readFileSync } from "node:fs";
import { dirname, basename, join } from "node:path";
import type { IRStyleBlock } from "../../../ir/render/nodes.ts";
import { UNKNOWN_LOCATION } from "../../../ir/types.ts";

export interface ResolvedSiblings {
  readonly styles: IRStyleBlock[];
}

const STYLE_EXTENSIONS = [".ink.css", ".ink.scss", ".ink.less"] as const;

function langFromExt(ext: string): "css" | "scss" | "less" {
  if (ext.endsWith(".scss")) return "scss";
  if (ext.endsWith(".less")) return "less";
  return "css";
}

export function resolveSiblings(fileName: string): ResolvedSiblings {
  const styles: IRStyleBlock[] = [];
  const dir = dirname(fileName);
  const base = basename(fileName, ".ink.tsx");

  for (const ext of STYLE_EXTENSIONS) {
    const siblingPath = join(dir, `${base}${ext}`);
    if (existsSync(siblingPath)) {
      const css = readFileSync(siblingPath, "utf-8");
      styles.push({
        css,
        scoped: true,
        lang: langFromExt(ext),
        loc: { ...UNKNOWN_LOCATION, file: siblingPath },
      });
    }
  }

  return { styles };
}
