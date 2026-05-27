import { accessSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const REPO_ROOT = resolve(import.meta.dirname, "../../..");

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".git",
  ".old",
  "dist",
  "generated",
  ".styleframe",
  "coverage",
  "storybook-static",
  ".context",
  ".turbo",
  ".vite-hooks",
]);

function walkMarkdown(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMarkdown(full));
    } else if (!entry.isFile()) {
      continue;
    } else if (entry.name === "AGENTS.md") {
      out.push(full);
    } else if (entry.name.endsWith(".md") && relative(REPO_ROOT, dir).startsWith("docs")) {
      out.push(full);
    }
  }
  return out;
}

// Match [text](target) — captures the target. Naive enough that targets with
// parentheses inside them won't work, but our relative paths don't use them.
const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

// Strip fenced code blocks so triple-backtick examples don't generate false
// positives.
function stripCodeFences(input: string): string {
  return input.replace(/```[\s\S]*?```/g, "");
}

function extractRelativeTargets(content: string): string[] {
  const stripped = stripCodeFences(content);
  const out: string[] = [];
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(stripped)) !== null) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    // Strip optional title: [text](path "title")
    const target = raw.split(/\s+/)[0] ?? "";
    if (!target) continue;
    // Skip non-relative targets.
    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue; // protocol (http:, mailto:, etc.)
    if (target.startsWith("#")) continue; // page-internal anchor
    out.push(target);
  }
  return out;
}

function resolveTarget(fromFile: string, link: string): string {
  // Drop URL fragments (#section) before resolving on disk.
  const cleaned = link.replace(/#.*$/, "");
  if (cleaned === "") return fromFile; // anchor-only, already filtered above
  return resolve(dirname(fromFile), cleaned);
}

describe("docs link integrity", () => {
  const files = walkMarkdown(REPO_ROOT);

  it("discovers at least the root AGENTS.md and docs/*.md", () => {
    const rels = files.map((f) => relative(REPO_ROOT, f));
    expect(rels).toContain("AGENTS.md");
    expect(rels.some((r) => r.startsWith("docs/"))).toBe(true);
  });

  it("every relative link in AGENTS.md / docs/*.md resolves to an existing file or directory", () => {
    const issues: string[] = [];
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      const targets = extractRelativeTargets(content);
      for (const target of targets) {
        const resolved = resolveTarget(file, target);
        try {
          accessSync(resolved);
        } catch {
          issues.push(`${relative(REPO_ROOT, file)} -> ${target}`);
        }
      }
    }
    expect(issues, `Broken relative links:\n${issues.join("\n")}`).toEqual([]);
  });
});
