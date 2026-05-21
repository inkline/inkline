import type { Diagnostic } from "@inkline/compiler";

export function formatDiagnostic(d: Diagnostic): string {
  const loc =
    d.loc.file !== "<unknown>" ? `${d.loc.file}:${d.loc.line}:${d.loc.column}` : "<unknown>";
  let msg = `${loc}  ${d.severity}  ${d.code}  ${d.title}`;
  if (d.help) msg += `\n    help: ${d.help}`;
  if (d.url) msg += `\n    docs: ${d.url}`;
  return msg;
}
