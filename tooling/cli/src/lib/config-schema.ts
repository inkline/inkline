import {
  ALL_TARGETS,
  createDiagnosticCollector,
  suggestClosest,
  type Diagnostic,
  type InklineConfig,
} from "@inkline/compiler";
import { z } from "zod";
import { REPORT_LEVELS } from "./report.ts";

const targetName = z.enum(ALL_TARGETS as readonly string[] as [string, ...string[]]);
const reportLevel = z.enum(REPORT_LEVELS as readonly string[] as [string, ...string[]]);

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
  // Guarded twice, but only one fires per path. A bad `reportLevel` in the config file stops here
  // on INK0083, which is fatal (see `validateConfig`) and returns before `resolveReportLevel` runs;
  // INK0087 is what `--report-level` hits, since a flag never passes through this schema. Both name
  // the accepted levels, so neither path leaves the author guessing.
  reportLevel: reportLevel.optional(),
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

/**
 * The fields whose *keys* are target names rather than config keys. A typo in one of these is a
 * misspelled target, so it is matched against {@link ALL_TARGETS} — matching it against the config
 * key set is how `targetOutDir: { raect: … }` used to be reported with no suggestion at all.
 */
const TARGET_KEYED_FIELDS: readonly string[] = ["targetOutDir", "targetOptions"];

/**
 * Suggestions come from `@inkline/compiler` rather than a local edit-distance function so that one
 * spelling of "did you mean" answers for every path a target name arrives on. The CLI previously
 * carried its own copy with a fixed distance-2 threshold; the shared one scales its threshold with
 * input length and counts a transposition as one edit, which is what `compile --target reakt`
 * already reported and what this file now reports too.
 */
function suggestFor(path: readonly PropertyKey[]): string | undefined {
  const [head, ...rest] = path;
  if (rest.length === 0) return suggestClosest(String(head), CONFIG_KEYS);
  // A record key is only guessable when it names a target, and only one segment deep:
  // `barrels[0].mod` has no candidate set to match against, so it is reported by path alone.
  if (rest.length !== 1 || !TARGET_KEYED_FIELDS.includes(String(head))) return undefined;
  const closest = suggestClosest(String(rest[0]), ALL_TARGETS);
  return closest && `${String(head)}.${closest}`;
}

/**
 * The unknown target named at `path`, or `undefined` when the issue is not an unknown target.
 *
 * Only `targets[n]` qualifies. The enum rejects a non-string with the same `invalid_value` code —
 * `targets: [42]` is a wrong-typed value, not a misspelling, and stays on INK0083 where the help
 * text about types is the true one.
 */
function unknownTargetAt(subject: object, path: readonly PropertyKey[]): string | undefined {
  if (path.length !== 2 || path[0] !== "targets" || typeof path[1] !== "number") return undefined;
  const value = (subject as { targets?: unknown }).targets;
  if (!Array.isArray(value)) return undefined;
  const target: unknown = value[path[1]];
  return typeof target === "string" ? target : undefined;
}

/**
 * The paths of the keys an issue reports as unrecognised, or `undefined` if it is not about keys.
 *
 * Zod says "this key is not one we know" under two codes, and they carry the key in different
 * places:
 *
 * - `unrecognized_keys`, from a `strictObject`, puts the offending names in `issue.keys` and the
 *   container in `issue.path` — so a root-level typo arrives as `path: []`, `keys: ["sourceMaps"]`.
 * - `invalid_key`, from a `partialRecord` whose key enum rejected the name, has already appended the
 *   name to `issue.path` — `targetOutDir: { preact: … }` arrives as `path: ["targetOutDir", "preact"]`.
 *
 * Both are unknown keys and neither is fatal. Matching only the first is what made a leftover
 * `targetOutDir`/`targetOptions` entry for a target you no longer build fall through to INK0083 and
 * stop the run over a key the commands never read.
 */
function unknownKeyPaths(issue: z.core.$ZodIssue): readonly (readonly PropertyKey[])[] | undefined {
  if (issue.code === "unrecognized_keys") return issue.keys.map((key) => [...issue.path, key]);
  if (issue.code === "invalid_key") return [issue.path];
  return undefined;
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
 * Nothing is rewritten — the config is reported on, never repaired — but the two failure kinds carry
 * different severities because they have different consequences downstream:
 *
 * - An **unknown key** (INK0081/INK0082) is a `warning`. Configs in the wild carry keys we do not
 *   know about; the key is ignored and the run continues. Silently swallowing a typo is the failure
 *   mode this guards against, not the typo itself.
 * - A **wrong value type** on a recognised key (INK0083) is an `error`. Every recognised key is
 *   consumed by the commands, and consuming a value of the wrong type means calling a method that
 *   does not exist (`targets.join`, `barrels.filter`, `srcDir.endsWith`). The caller stops instead.
 * - An **unknown target in `targets`** (INK0085) is an `error` too, and deliberately the *same*
 *   error `--target` raises. It is a wrong value on a recognised key, so it stops the run like any
 *   other; routing it to INK0085 only changes which message the author reads.
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
    const unknownKeys = unknownKeyPaths(issue);

    if (unknownKeys) {
      for (const path of unknownKeys) {
        const key = formatPath(path);
        const suggestion = suggestFor(path);
        if (suggestion) {
          diagnostics.push("INK0082", loc, { key, suggestion });
        } else {
          diagnostics.push("INK0081", loc, { key });
        }
      }
      continue;
    }

    // A misspelled target in `targets` is the same mistake `--target` makes, so it gets the same
    // diagnostic rather than the generic "invalid config value". Still an error, and still fatal:
    // `resolveOptions` would refuse this config anyway, and the point of validating here is to say
    // so with the message that names the fix.
    const target = unknownTargetAt(subject, issue.path);
    if (target !== undefined) {
      const closest = suggestClosest(target, ALL_TARGETS);
      diagnostics.push("INK0085", loc, {
        target,
        targets: ALL_TARGETS.join(", "),
        suggestion: closest ? `Did you mean "${closest}"? ` : "",
      });
      continue;
    }

    diagnostics.push("INK0083", loc, {
      path: formatPath(issue.path),
      message: issue.message,
    });
  }

  return diagnostics.freeze();
}
