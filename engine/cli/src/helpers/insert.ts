import { findLastImportLineIndex, findLastRequireIndex } from './find-index';

export function addBefore(code: string, index: number, content: string): string {
    const lines = code.split('\n');
    const preamble = lines.slice(0, index);
    const postamble = lines.slice(index, lines.length);

    return [...preamble, ...content.split('\n'), ...postamble].join('\n');
}

export function addAfter(code: string, index: number, content: string): string {
    const lines = code.split('\n');
    const preamble = lines.slice(0, index + 1);
    const postamble = lines.slice(index + 1, lines.length);

    return [...preamble, ...content.split('\n'), ...postamble].join('\n');
}

export function addAfterImports(code: string, content: string): string {
    const lastImportIndex = findLastImportLineIndex(code);

    return addAfter(code, lastImportIndex, content);
}

export function addAfterRequires(code: string, content: string): string {
    const lastRequireIndex = findLastRequireIndex(code);

    return addAfter(code, lastRequireIndex, content);
}
