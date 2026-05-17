import { watch as nodeWatch } from "node:fs";
import { resolve } from "node:path";
import type { GenerateOptions, GenerateResult } from "../generator/index.ts";

export interface CliIo {
  readonly log: (message: string) => void;
  readonly error: (message: string) => void;
}

export interface CliDeps {
  readonly generate: (options: GenerateOptions) => Promise<GenerateResult>;
  readonly watch: typeof nodeWatch;
  readonly io: CliIo;
  readonly cwd: string;
}

export interface ParsedArgs {
  readonly command: string;
  readonly flags: { watch: boolean; coreDir?: string; uiDir?: string };
}

export const USAGE = `Usage: inkline-storybook <command> [options]

Commands:
  generate        Generate per-framework story files from ui/core/stories.
  help            Show this help.

Options:
  --core-dir <p>  Single-source story definitions dir. Default: ../../ui/core/stories
  --ui-dir <p>    Root of the ui/<target> packages.     Default: ../../ui
  --watch         Regenerate when a definition changes.`;

export function parseArgs(argv: readonly string[]): ParsedArgs {
  const command = argv[0] ?? "help";
  const flags: ParsedArgs["flags"] = { watch: false };
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === "--watch") flags.watch = true;
    else if (arg === "--core-dir") flags.coreDir = argv[++i];
    else if (arg === "--ui-dir") flags.uiDir = argv[++i];
  }
  return { command, flags };
}

export function resolveOptions(flags: ParsedArgs["flags"], cwd: string): GenerateOptions {
  return {
    coreStoriesDir: resolve(cwd, flags.coreDir ?? "../../ui/core/stories"),
    uiDir: resolve(cwd, flags.uiDir ?? "../../ui"),
  };
}

function summarize(result: GenerateResult): string {
  return `Generated ${result.files.length} story file(s) for ${result.components.length} component(s).`;
}

/** Watches the definitions directory and regenerates on change. */
export function startWatch(
  coreStoriesDir: string,
  regenerate: () => Promise<void>,
  deps: { watch: typeof nodeWatch; io: CliIo },
): void {
  deps.watch(coreStoriesDir, () => {
    regenerate().catch((err: unknown) =>
      deps.io.error(err instanceof Error ? err.message : String(err)),
    );
  });
}

/** Parses args and runs the generator. Returns a process exit code. */
export async function runCli(argv: readonly string[], deps: CliDeps): Promise<number> {
  const { command, flags } = parseArgs(argv);

  if (command === "help") {
    deps.io.log(USAGE);
    return 0;
  }
  if (command !== "generate") {
    deps.io.error(`Unknown command: ${command}`);
    deps.io.log(USAGE);
    return 2;
  }

  const options = resolveOptions(flags, deps.cwd);
  const regenerate = async (): Promise<void> => {
    deps.io.log(summarize(await deps.generate(options)));
  };

  try {
    await regenerate();
    if (flags.watch) {
      startWatch(options.coreStoriesDir, regenerate, { watch: deps.watch, io: deps.io });
      deps.io.log(`Watching ${options.coreStoriesDir} for changes...`);
    }
    return 0;
  } catch (err) {
    deps.io.error(err instanceof Error ? err.message : String(err));
    return 1;
  }
}
