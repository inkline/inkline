export function addBefore(lines: string[], index: number, content: string[]): string[] {
    const preamble = lines.slice(0, index);
    const postamble = lines.slice(index, lines.length);

    return [...preamble, ...content, ...postamble];
}
