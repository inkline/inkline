/**
 * cyrb53 (c) 2018 bryc (github.com/bryc)
 * License: Public domain
 * A fast and simple 64-bit (or 53-bit) string hash function with decent collision resistance.
 * Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
 * See https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/52171480#52171480
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 */

function cyrb64(str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return [h2 >>> 0, h1 >>> 0];
}

export function hash(str: string, seed = 0): string {
    const [h2, h1] = cyrb64(str, seed);
    return h2.toString(36).padStart(7, '0') + h1.toString(36).padStart(7, '0');
}
