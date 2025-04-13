import { defaultIndent } from "./constants";

export function addDefaultIndentToLine(string: string): string {
    return `${defaultIndent}${string}`;
}

export function indentLines(string: string): string {
    return string.split('\n').map(addDefaultIndentToLine).join('\n');
}
