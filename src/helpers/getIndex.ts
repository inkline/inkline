export function getLastImportIndex(lines: string[]): number {
    return lines
        .slice()
        .map((line) => (line.startsWith('import') ? 'import' : ''))
        .lastIndexOf('import');
}

export function getLastRequireIndex(lines: string[]): number {
    return lines
        .slice()
        .map((line) => (/^((const|let)\s+\w+\s*=\s*)?require\(.*\)/.test(line) ? 'require' : ''))
        .lastIndexOf('require');
}

export function getLastLineIndex(lines: string[]): number {
    return (
        lines.length -
        1 -
        lines
            .slice()
            .reverse()
            .findIndex((line) => line.trim().length)
    );
}
