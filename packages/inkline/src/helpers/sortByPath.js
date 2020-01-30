import { getValueByPath } from "@inkline/inkline/src/helpers/getValueByPath";

/**
 * Sort an array of objects by path
 *
 * @param path
 * @returns {function(*=, *=): number}
 */
export function sortByPath(path) {
    return (a, b) => {
        return (getValueByPath(a, path) > getValueByPath(b, path)) ?
            1 : (getValueByPath(a, path) < getValueByPath(b, path)) ? -1 : 0;
    };
}
