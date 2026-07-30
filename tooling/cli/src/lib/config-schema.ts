import {
  ALL_SEVERITIES,
  ALL_TARGETS,
  createDiagnosticCollector,
  type Diagnostic,
  type InklineConfig,
} from "@inkline/compiler";
import { z } from "zod";

const targetName = z.enum(ALL_TARGETS as readonly string[] as [string, ...string[]]);
const severity = z.enum(ALL_SEVERITIES as readonly string[] as [string, ...string[]]);

const barrelGroup = z.strictObject({
  file: z.string(),
  match: z.string(),
  mode: z.enum(["named", "namespace"]).optional(),
});

/**
 * Runtime schema for a config file, and the source of truth for which keys are recognised.
 *
 * It lives in `@inkline/cli` rather than `@inkline/compiler` because this is the only place a
 * config file is read, and because two fields carry behaviour rather than data: `registry`
 * exposes methods and each `plugins` entry holds function-valued hooks. Those are shape-checked
 * only — pretending to validate them would be a lie, and deriving `InklineConfig` from a schema
 * that cannot express them would change the compiler's published public type.
 *
 * Every field is optional: the CLI loads a `Partial<InklineConfig>` and `resolveOptions` supplies
 * the defaults. Validation reports what is present; it never demands what is absent.
 */
export const inklineConfigSchema = z.strictObject({
  targets: z.array(targetName).optional(),
  srcDir: z.string().optional(),
  outDir: z.string().optional(),
  targetOutDir: z.partialRecord(targetName, z.string()).optional(),
  sourceMap: z.enum(["external", "inline", "none"]).optional(),
  targetOptions: z.partialRecord(targetName, z.record(z.string(), z.unknown())).optional(),
  // `hooks` holds functions and rides along in the loose part — only the identifying fields are checked.
  plugins: z
    .array(z.looseObject({ name: z.string(), targets: z.array(targetName).optional() }))
    .optional(),
  verbose: z.boolean().optional(),
  // A target registry is an object with `get`/`has`/`list` methods; presence and object-ness is all
  // that can be checked without calling it.
  registry: z.custom<object>((v) => typeof v === "object" && v !== null).optional(),
  barrels: z.array(barrelGroup).optional(),
  // Reported as INK0083 when it is the wrong type or an unknown level, but the value is passed
  // through unchanged like every other schema failure — so `resolveReportLevel` validates it again
  // and refuses to hand an unrecognised level to the filter.
  reportLevel: severity.optional(),
  tsconfig: z.string().optional(),
});

type Assert<T extends true> = T;

type KeysEqual<A extends PropertyKey, B extends PropertyKey> = [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false;

/**
 * Compile-time guard tying the schema to {@link InklineConfig}: adding or removing a field on one
 * without the other makes `KeysEqual` resolve to `false`, which violates `Assert`'s constraint and
 * fails typecheck. This replaces a hand-maintained runtime key mirror — there is nothing to keep in
 * sync at runtime, only this assertion.
 */
export type ConfigSchemaCoversInklineConfig = Assert<
  KeysEqual<keyof typeof inklineConfigSchema.shape, keyof InklineConfig>
>;

/** The recognised config keys, derived from the schema rather than restated alongside it. */
const CONFIG_KEYS: readonly string[] = Object.keys(inklineConfigSchema.shape);

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

  for (const known of CONFIG_KEYS) {
    const distance = editDistance(key.toLowerCase(), known.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      best = known;
    }
  }

  return best;
}

function formatPath(path: readonly PropertyKey[]): string {
  if (path.length === 0) return "<root>";
  return path.reduce<string>(
    (acc, segment) =>
      typeof segment === "number"
        ? `${acc}[${segment}]`
        : acc
          ? `${acc}.${String(segment)}`
          : String(segment),
    "",
  );
}

/**
 * Validates a loaded config against {@link inklineConfigSchema} and reports the failures as
 * diagnostics.
 *
 * Nothing here is fatal and nothing is rewritten: an unknown key or a wrong value type is reported
 * and the config is used as loaded. Configs in the wild carry keys we do not know about, and
 * silently swallowing a typo is the failure mode this guards against — not the typo itself.
 */
export function validateConfig(config: object, file = "<unknown>"): readonly Diagnostic[] {
  const diagnostics = createDiagnosticCollector();
  const loc = { file, line: 0, column: 0, offset: 0, length: 0 };

  // `$development` / `$test` / … are c12 environment overrides, not config keys.
  const subject = Object.fromEntries(
    Object.entries(config).filter(([key]) => !key.startsWith("$")),
  );

  const result = inklineConfigSchema.safeParse(subject);
  if (result.success) return diagnostics.freeze();

  for (const issue of result.error.issues) {
    // Only top-level unrecognised keys are config keys; a stray key inside `barrels[0]` is a value
    // problem and is reported as one.
    if (issue.code === "unrecognized_keys" && issue.path.length === 0) {
      for (const key of issue.keys) {
        const suggestion = suggestConfigKey(key);
        if (suggestion) {
          diagnostics.push("INK0082", loc, { key, suggestion });
        } else {
          diagnostics.push("INK0081", loc, { key });
        }
      }
      continue;
    }

    diagnostics.push("INK0083", loc, {
      path: formatPath(issue.path),
      message: issue.message,
    });
  }

  return diagnostics.freeze();
}
