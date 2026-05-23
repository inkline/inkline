import { globSync } from "node:fs";

export function expandGlobs(patterns: string[]): string[] {
  const files: string[] = [];
  for (const pattern of patterns) {
    if (/[*?{[]/.test(pattern)) {
      const matches = globSync(pattern) as string[];
      files.push(...matches);
    } else {
      files.push(pattern);
    }
  }
  return files;
}
