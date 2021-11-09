import { keymap } from '@inkline/inkline/constants';

/**
 * Verify if the given event is mapped to a specific key
 *
 * @param key
 * @param e
 * @returns {boolean}
 */
export const isKey = (key: string, e: KeyboardEvent): boolean => {
    const keyCode = e.key || (e as any).keyIdentifier || e.keyCode;

    return keymap[key].indexOf(keyCode) !== -1;
};
