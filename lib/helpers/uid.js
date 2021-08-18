/**
 * Math.random should be unique because of its seeding algorithm.
 * Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
 *
 * @param baseId
 */
export function uid(baseId) {
    return `${baseId ? `${baseId}-` : ''}${Math.random().toString(36).substr(2, 9)}`;
}
//# sourceMappingURL=uid.js.map