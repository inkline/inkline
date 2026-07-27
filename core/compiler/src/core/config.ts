import type { Diagnostic } from "./diagnostics/codes.ts";
import { createDiagnosticCollector } from "./diagnostics/collector.ts";
import { INKLINE_CONFIG_KEYS, type InklineConfig } from "./options.ts";

export function defineConfig(c: InklineConfig): InklineConfig {
  return c;
}

/** Maximum edit distance at which an unknown key is reported as a probable typo. */
const MAX_SUGGESTION_DISTANCE = 2;

function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j - 1]! + 1, prev[j]! + 1, prev[j - 1]! + cost);
    }
    prev = row;
  }

  return prev[b.length]!;
}

function suggestConfigKey(key: string): string | undefined {
  let best: string | undefined;
  let bestDistance = MAX_SUGGESTION_DISTANCE + 1;

  for (const known of INKLINE_CONFIG_KEYS) {
    const distance = editDistance(key.toLowerCase(), known.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      best = known;
    }
  }

  return best;
}

/**
 * Reports keys of a loaded config object that are not part of {@link InklineConfig}.
 *
 * Unknown keys are warnings, never errors: a config in the wild may legitimately carry extra keys,
 * and silently ignoring a typo is the failure mode this guards against. Only key names are checked —
 * value types are not validated here.
 */
export function validateConfigKeys(config: object, file = "<unknown>"): readonly Diagnostic[] {
  const diagnostics = createDiagnosticCollector();
  const loc = { file, line: 0, column: 0, offset: 0, length: 0 };

  for (const key of Object.keys(config)) {
    // `$development` / `$test` / … are c12 environment overrides, not config keys.
    if (key.startsWith("$")) continue;
    if (INKLINE_CONFIG_KEYS.includes(key)) continue;

    const suggestion = suggestConfigKey(key);
    if (suggestion) {
      diagnostics.push("INK0082", loc, { key, suggestion });
    } else {
      diagnostics.push("INK0081", loc, { key });
    }
  }

  return diagnostics.freeze();
}
