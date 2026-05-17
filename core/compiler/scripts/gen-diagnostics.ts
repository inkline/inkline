import { DIAGNOSTICS } from "../src/core/diagnostics/codes.ts";

const lines: string[] = [
  "# Diagnostic Reference",
  "",
  "Auto-generated from `src/core/diagnostics/codes.ts`.",
  "",
  "| Code | Severity | Title | Help |",
  "|---|---|---|---|",
];

for (const [code, def] of Object.entries(DIAGNOSTICS)) {
  const help = "help" in def && def.help ? String(def.help) : "—";
  lines.push(`| [${code}](${def.url}) | ${def.severity} | ${def.title} | ${help} |`);
}

lines.push("");

process.stdout.write(lines.join("\n"));
