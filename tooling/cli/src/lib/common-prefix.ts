export function commonPrefix(dirs: string[]): string {
  if (dirs.length === 0) return "";
  const parts = dirs[0]!.split("/");
  let prefix = "";
  for (let i = 0; i < parts.length; i++) {
    const candidate = parts.slice(0, i + 1).join("/") + "/";
    if (dirs.every((d) => (d + "/").startsWith(candidate))) prefix = candidate;
    else break;
  }
  return prefix;
}
