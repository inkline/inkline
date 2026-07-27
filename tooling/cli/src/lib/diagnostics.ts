import type { Diagnostic } from "@inkline/compiler";

/**
 * Config-time diagnostics carry no source position. Printing `<unknown>:0:0` for them is noise, so
 * the location prefix is dropped entirely when there is nothing real to point at.
 */
function formatLocation(loc: Diagnostic["loc"]): string {
  if (!loc.file || loc.file === "<unknown>") return "";
  return `${loc.file}:${loc.line}:${loc.column}  `;
}

export function formatDiagnostic(d: Diagnostic): string {
  let msg = `${formatLocation(d.loc)}${d.severity}  ${d.code}  ${d.title}`;
  if (d.help) msg += `\n    help: ${d.help}`;
  if (d.url) msg += `\n    docs: ${d.url}`;
  return msg;
}
