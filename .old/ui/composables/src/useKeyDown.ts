import type { MaybeRef, Ref } from 'vue';
import { unref } from 'vue';
import { off, on } from '@inkline/utils';

type UseKeyDownElement = MaybeRef<HTMLElement | null>;
type UseKeyDownCallback = ((event: KeyboardEvent) => void) | (() => void);
type UseKeyDownKeyMap = {
    [key: string]: UseKeyDownCallback | Ref<UseKeyDownCallback>;
};
type UseKeyDownListener = {
    element: UseKeyDownElement;
    keymap: UseKeyDownKeyMap;
};

const keydownListeners: UseKeyDownListener[] = [];

function handleGlobalKeyDown(event: KeyboardEvent) {
    keydownListeners.forEach(({ element, keymap }) => {
        const el = unref(element);
        if (!el) {
            return;
        }

        const callback = keymap[event.key]; // Check if the event key has a callback in the map

        if (callback) {
            const fn = unref(callback);
            fn(event); // Call the corresponding callback
        }
    });
}

// Register the global listener once
function registerGlobalKeyDownListener() {
    if (typeof window !== 'undefined') {
        on(window.document, 'keydown', handleGlobalKeyDown);
    }
}

// Unregister the global listener if no elements are left
function unregisterGlobalKeyDownListener() {
    if (typeof window !== 'undefined') {
        off(window.document, 'keydown', handleGlobalKeyDown);
    }
}

export function useKeyDown(element: Ref<HTMLElement | null>, keymap: UseKeyDownKeyMap) {
    if (typeof window === 'undefined') return () => {};

    // Add the element and its key-callback map to the list
    keydownListeners.push({ element, keymap });

    // If it's the first element, register the global listener
    if (keydownListeners.length === 1) {
        registerGlobalKeyDownListener();
    }

    // Return a function to remove this specific listener
    return () => {
        const index = keydownListeners.findIndex(
            (pair) => pair.element === element && pair.keymap === keymap
        );

        if (index > -1) {
            keydownListeners.splice(index, 1);
        }

        // Unregister the global listener if no elements are left
        if (keydownListeners.length === 0) {
            unregisterGlobalKeyDownListener();
        }
    };
}
