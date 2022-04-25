/**
 * Return indented string
 *
 * @param code
 * @param size
 * @param character
 */
export const codegenIndent = (code: string, size: number = 4, character = ' ') => {
    const indent = Array(size).fill(character).join('');

    return `${indent}${code}`;
};