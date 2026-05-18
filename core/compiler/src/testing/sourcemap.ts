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

export interface IdentifierMapping {
  readonly name: string;
  readonly originalLine: number;
  readonly originalColumn: number;
}

export interface IdentifierVerification {
  readonly name: string;
  readonly generatedLine: number;
  readonly generatedColumn: number;
  readonly originalLine?: number;
  readonly originalColumn?: number;
  readonly pass: boolean;
  readonly error?: string;
}

export function verifyIdentifierMappings(
  file: GeneratedFile,
  identifiers: readonly IdentifierMapping[],
  tolerance = 1,
): readonly IdentifierVerification[] {
  if (!file.sourceMap) {
    return identifiers.map((id) => ({
      name: id.name,
      generatedLine: -1,
      generatedColumn: -1,
      pass: false,
      error: "No source map",
    }));
  }

  const map = JSON.parse(file.sourceMap) as { sources: string[]; mappings: string };
  const mappings = parseMappings(map.mappings, map.sources);
  const lines = file.contents.split("\n");
  const results: IdentifierVerification[] = [];

  for (const id of identifiers) {
    const genPos = findIdentifierInGenerated(lines, id.name);
    if (!genPos) {
      results.push({
        name: id.name,
        generatedLine: -1,
        generatedColumn: -1,
        pass: false,
        error: `Identifier "${id.name}" not found in generated output`,
      });
      continue;
    }

    const nearest = findNearestMapping(mappings, genPos.line, genPos.column);
    if (!nearest || nearest.originalLine === undefined) {
      results.push({
        name: id.name,
        generatedLine: genPos.line,
        generatedColumn: genPos.column,
        pass: false,
        error: `No source mapping near ${genPos.line}:${genPos.column}`,
      });
      continue;
    }

    const lineDiff = Math.abs(nearest.originalLine - id.originalLine);
    const colDiff = Math.abs((nearest.originalColumn ?? 0) - id.originalColumn);
    const pass = lineDiff <= tolerance && colDiff <= tolerance;

    results.push({
      name: id.name,
      generatedLine: genPos.line,
      generatedColumn: genPos.column,
      originalLine: nearest.originalLine,
      originalColumn: nearest.originalColumn,
      pass,
      error: pass
        ? undefined
        : `Expected ~${id.originalLine}:${id.originalColumn}, got ${nearest.originalLine}:${nearest.originalColumn}`,
    });
  }

  return results;
}

function findIdentifierInGenerated(
  lines: string[],
  name: string,
): { line: number; column: number } | undefined {
  const pattern = new RegExp(`\\b${escapeRegExp(name)}\\b`);
  for (let i = 0; i < lines.length; i++) {
    const match = pattern.exec(lines[i]!);
    if (match) return { line: i, column: match.index };
  }
  return undefined;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findNearestMapping(
  mappings: SourceMapping[],
  line: number,
  column: number,
): SourceMapping | undefined {
  const sameLine = mappings.filter((m) => m.generatedLine === line);
  if (sameLine.length === 0) return undefined;

  const atOrBefore = sameLine.filter((m) => m.generatedColumn <= column);
  if (atOrBefore.length > 0) return atOrBefore[atOrBefore.length - 1];
  return sameLine[0];
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
