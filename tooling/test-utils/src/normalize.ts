export function normalizeHtml(html: string): string {
  return html
    .replace(/\s+/g, " ")
    .replace(/\s*(<\/?[^>]+>)\s*/g, "$1")
    .replace(/\s([\w-]+)=""/g, " $1")
    .replace(/ (class|style)="([^"]*)"/g, (_, attr: string, val: string) => {
      const sorted = val.split(/\s+/).filter(Boolean).sort().join(" ");
      return ` ${attr}="${sorted}"`;
    })
    .trim();
}
