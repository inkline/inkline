import type { GeneratedFile } from "../codegen/context.ts";

interface SourceMapping {
  generatedLine: number;
  generatedColumn: number;
  originalFile?: string;
  originalLine?: number;
  originalColumn?: number;
}

function decodeVlq(encoded: string): number[] {
  const values: number[] = [];
  let current = 0;
  let shift = 0;

  for (const char of encoded) {
    const digit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(char);
    if (digit === -1) continue;
    current |= (digit & 0x1f) << shift;
    shift += 5;
    if ((digit & 0x20) === 0) {
      values.push(current & 1 ? -(current >>> 1) : current >>> 1);
      current = 0;
      shift = 0;
    }
  }
  return values;
}

function parseMappings(mappingsStr: string, sources: readonly string[]): SourceMapping[] {
  const result: SourceMapping[] = [];
  const groups = mappingsStr.split(";");

  let prevSrcIdx = 0;
  let prevSrcLine = 0;
  let prevSrcCol = 0;

  for (let genLine = 0; genLine < groups.length; genLine++) {
    const group = groups[genLine]!;
    if (group.length === 0) continue;

    let prevGenCol = 0;
    for (const segment of group.split(",")) {
      const values = decodeVlq(segment);
      if (values.length < 4) continue;

      prevGenCol += values[0]!;
      prevSrcIdx += values[1]!;
      prevSrcLine += values[2]!;
      prevSrcCol += values[3]!;

      result.push({
        generatedLine: genLine,
        generatedColumn: prevGenCol,
        originalFile: sources[prevSrcIdx],
        originalLine: prevSrcLine,
        originalColumn: prevSrcCol,
      });
    }
  }

  return result;
}

export function expectMappingAt(
  file: GeneratedFile,
  line: number,
  column: number,
): {
  resolvesTo(expected: { originalLine: number; originalColumn: number; tolerance?: number }): void;
} {
  return {
    resolvesTo(expected) {
      if (!file.sourceMap) throw new Error("GeneratedFile has no sourceMap");

      const map = JSON.parse(file.sourceMap) as {
        sources: string[];
        mappings: string;
      };
      const mappings = parseMappings(map.mappings, map.sources);

      const tolerance = expected.tolerance ?? 0;
      const match = mappings.find(
        (m) =>
          m.generatedLine === line &&
          m.generatedColumn === column &&
          m.originalLine !== undefined &&
          Math.abs(m.originalLine - expected.originalLine) <= tolerance &&
          Math.abs(m.originalColumn! - expected.originalColumn) <= tolerance,
      );

      if (!match) {
        const nearby = mappings.filter((m) => m.generatedLine === line);
        throw new Error(
          `No mapping at ${line}:${column} resolving to ${expected.originalLine}:${expected.originalColumn}. ` +
            `Nearby on line ${line}: ${JSON.stringify(nearby)}`,
        );
      }
    },
  };
}
