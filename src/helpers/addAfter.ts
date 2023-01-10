import { getLastImportIndex, getLastRequireIndex } from './getIndex';

export function addAfter(lines: string[], index: number, content: string[]): string[] {
    const preamble = lines.slice(0, index + 1);
    const postamble = lines.slice(index + 1, lines.length);

    return [...preamble, ...content, ...postamble];
}

export function addAfterImports(lines: string[], content: string[]): string[] {
    const lastImportIndex = getLastImportIndex(lines);

    return addAfter(lines, lastImportIndex, content);
}

export function addAfterRequires(lines: string[], content: string[]): string[] {
    const lastRequireIndex = getLastRequireIndex(lines);

    return addAfter(lines, lastRequireIndex, content);
}
