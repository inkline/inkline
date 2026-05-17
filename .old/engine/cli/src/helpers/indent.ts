import { defaultFileIndent } from '../constants';

export function getIndent(lines: string[]): string {
    return (
        lines.find((line) => /\s/.test(line[0]) && line.trim().length > 0)?.match(/^(\s+)/)?.[1] ||
        defaultFileIndent
    );
}
