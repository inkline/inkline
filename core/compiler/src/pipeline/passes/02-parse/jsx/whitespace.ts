/** Tags whose text content is whitespace-significant; their children are kept verbatim. */
export const WHITESPACE_SENSITIVE_TAGS: ReadonlySet<string> = new Set([
  "pre",
  "textarea",
  "script",
  "style",
]);

/**
 * Clean a single JSX text child to its rendered content, matching Babel's
 * `cleanJSXElementLiteralChild` (the JSX whitespace spec): tabs become spaces, whitespace that
 * touches a line break is dropped, blank lines are removed, surviving lines are joined with a single
 * space, and a meaningful same-line space (leading, trailing, or a whitespace-only run with no
 * newline) is preserved. Returns `""` for pure inter-element formatting whitespace — the caller drops
 * that node.
 *
 * This is the single source of truth for whitespace across every target: the IR carries the exact
 * rendered text, and each codegen target emits it inline so the seven frameworks render identically.
 */
export function cleanJsxText(raw: string): string {
  const lines = raw.split(/\r\n|\n|\r/);

  let lastNonEmpty = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/[^ \t]/.test(lines[i]!)) lastNonEmpty = i;
  }

  let result = "";
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]!.replace(/\t/g, " ");
    if (i !== 0) line = line.replace(/^ +/, "");
    if (i !== lines.length - 1) line = line.replace(/ +$/, "");
    if (line === "") continue;
    if (i !== lastNonEmpty) line += " ";
    result += line;
  }

  return result;
}
