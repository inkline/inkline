import { isAbsolute, relative } from "node:path";
import type { Diagnostic } from "@inkline/compiler";

export interface FormatDiagnosticOptions {
  /**
   * Full text of the file the diagnostic points at. The formatter stays pure — it never reads the
   * file itself — so callers that have the source already pass it here to get a code frame. Omit it
   * and the frame is skipped.
   */
  source?: string;
  /** Directory the printed path is made relative to. Defaults to the invocation directory. */
  cwd?: string;
}

/**
 * Absolute paths put a ~140-character prefix on every line of output. Print the path relative to the
 * invocation directory instead, unless that comes out longer (a file outside the tree climbs out
 * through `../../..`), in which case the absolute path is the shorter read.
 */
function formatPath(file: string, cwd: string): string {
  if (!isAbsolute(file)) return file;
  const rel = relative(cwd, file);
  return rel.length > 0 && rel.length < file.length ? rel : file;
}

/**
 * Config-time diagnostics carry no source position. Printing `<unknown>:0:0` for them is noise, so
 * the location prefix is dropped entirely when there is nothing real to point at.
 */
function hasLocation(loc: Diagnostic["loc"]): boolean {
  return Boolean(loc.file) && loc.file !== "<unknown>";
}

function formatLocation(loc: Diagnostic["loc"], cwd: string): string {
  if (!hasLocation(loc)) return "";
  return `${formatPath(loc.file, cwd)}:${loc.line}:${loc.column}  `;
}

/**
 * A `rustc`-style code frame: the offending line behind a line-number gutter, and a caret run under
 * the reported span.
 *
 * ```
 *   10 |       <Show>
 *      |       ^^^^^^
 * ```
 *
 * `offset`/`length` from {@link SourceLocation} are the authority for the span; the line number is
 * derived from `offset` too so the gutter can never disagree with the slice it labels. A span that
 * crosses a line boundary is clamped to the end of its first line — the head of a multi-line span is
 * what identifies it, and printing the whole body buries the message.
 */
function renderFrame(loc: Diagnostic["loc"], source: string): string {
  const { offset, length } = loc;
  if (offset < 0 || offset > source.length) return "";

  const lineStart = offset === 0 ? 0 : source.lastIndexOf("\n", offset - 1) + 1;
  const newline = source.indexOf("\n", lineStart);
  const lineEnd = newline === -1 ? source.length : newline;
  const text = source.slice(lineStart, lineEnd).replace(/\r$/, "");

  const line = source.slice(0, lineStart).split("\n").length;
  const gutter = String(line);
  const blank = " ".repeat(gutter.length);

  // Copy the prefix verbatim except for its non-tab characters, so a tab-indented line keeps the
  // caret aligned whatever the terminal's tab width is. `column` is derived from `offset` rather
  // than trusted from `loc`, and can land one past the end of the line at EOF.
  const column = offset - lineStart;
  const prefix =
    text.slice(0, column).replace(/[^\t]/g, " ") + " ".repeat(Math.max(0, column - text.length));
  const carets = "^".repeat(Math.max(1, Math.min(length, text.length - column)));

  return `\n  ${gutter} | ${text}\n  ${blank} | ${prefix}${carets}`;
}

export function formatDiagnostic(d: Diagnostic, options: FormatDiagnosticOptions = {}): string {
  const cwd = options.cwd ?? process.cwd();

  let msg = `${formatLocation(d.loc, cwd)}${d.severity}  ${d.code}  ${d.title}`;
  if (options.source !== undefined && hasLocation(d.loc)) {
    msg += renderFrame(d.loc, options.source);
  }
  if (d.help) msg += `\n    help: ${d.help}`;
  if (d.url) msg += `\n    docs: ${d.url}`;
  return msg;
}
