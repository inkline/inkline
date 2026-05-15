import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function resolveComponent(importMetaUrl: string, relativePath: string): string {
  return resolve(dirname(fileURLToPath(importMetaUrl)), relativePath);
}
