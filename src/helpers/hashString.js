/**
 * Return hash for a given string
 *
 * @param string
 * @returns {number}
 */
export function hashString(string) {
    let hash = 0;

    if (string.length === 0) {
        return hash;
    }

    for (let i = 0; i < string.length; i++) {
        hash = ((hash << 5) - hash) + string.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }

    return hash;
}
