import {keymap} from "@inkline/inkline/src/constants";

/**
 * Verify if the given event is mapped to a specific key
 *
 * @param key
 * @param e
 * @returns {boolean}
 */
export const isKey = (key, e) => {
    const keyCode = e.key || e.keyIdentifier || e.keyCode;

    return keymap[key].indexOf(keyCode) !== -1;
};

