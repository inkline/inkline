import { importRegEx } from '../constants';

export function findLastImportLineIndex(code: string): number {
    const matches = [...code.matchAll(importRegEx)];

    if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const lastMatchIndex = lastMatch.index;
        return (
            (code.slice(0, lastMatchIndex).match(/\n/g) || []).length +
            (lastMatch[0].match(/\n/g) || []).length
        );
    }

    return -1;
}

export function findLastRequireIndex(code: string): number {
    return code
        .split('\n')
        .slice()
        .map((line) => (/^((const|let)\s+\w+\s*=\s*)?require\(.*\)/.test(line) ? 'require' : ''))
        .lastIndexOf('require');
}

export function findLastLineIndex(lines: string[]): number {
    return (
        lines.length -
        1 -
        lines
            .slice()
            .reverse()
            .findIndex((line) => line.trim().length)
    );
}
