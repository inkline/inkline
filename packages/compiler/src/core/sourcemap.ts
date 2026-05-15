const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function encodeVlq(value: number): string {
  let vlq = value < 0 ? (-value << 1) | 1 : value << 1;
  let result = "";
  do {
    let digit = vlq & 0x1f;
    vlq >>>= 5;
    if (vlq > 0) digit |= 0x20;
    result += BASE64[digit];
  } while (vlq > 0);
  return result;
}

interface Mapping {
  genLine: number;
  genCol: number;
  srcIndex: number;
  srcLine: number;
  srcCol: number;
}

export class SourceMapBuilder {
  private readonly sources: string[] = [];
  private readonly sourceIndices = new Map<string, number>();
  private readonly mappings: Mapping[] = [];

  addSource(file: string): number {
    const existing = this.sourceIndices.get(file);
    if (existing !== undefined) return existing;
    const idx = this.sources.length;
    this.sources.push(file);
    this.sourceIndices.set(file, idx);
    return idx;
  }

  add(genLine: number, genCol: number, srcFile: string, srcLine: number, srcCol: number): void {
    const srcIndex = this.addSource(srcFile);
    this.mappings.push({ genLine, genCol, srcIndex, srcLine, srcCol });
  }

  toJSON(file?: string): string {
    const sorted = [...this.mappings].sort((a, b) => a.genLine - b.genLine || a.genCol - b.genCol);

    let prevGenCol = 0;
    let prevSrcIndex = 0;
    let prevSrcLine = 0;
    let prevSrcCol = 0;
    let prevGenLine = 0;

    const groups: string[] = [];
    let currentGroup: string[] = [];

    for (const m of sorted) {
      while (prevGenLine < m.genLine) {
        groups.push(currentGroup.join(","));
        currentGroup = [];
        prevGenLine++;
        prevGenCol = 0;
      }

      let segment = encodeVlq(m.genCol - prevGenCol);
      segment += encodeVlq(m.srcIndex - prevSrcIndex);
      segment += encodeVlq(m.srcLine - prevSrcLine);
      segment += encodeVlq(m.srcCol - prevSrcCol);

      currentGroup.push(segment);

      prevGenCol = m.genCol;
      prevSrcIndex = m.srcIndex;
      prevSrcLine = m.srcLine;
      prevSrcCol = m.srcCol;
    }

    groups.push(currentGroup.join(","));

    const map = {
      version: 3 as const,
      file: file ?? "",
      sources: this.sources,
      names: [] as string[],
      mappings: groups.join(";"),
    };

    return JSON.stringify(map);
  }
}
