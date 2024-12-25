import type { MaybeRef } from 'vue';
import { unref } from 'vue';
import { isVisible, off, on } from '@inkline/utils';
import { unrefHTMLElement } from './utils';

type UseClickOutsideElement = Array<MaybeRef<HTMLElement | null>> | MaybeRef<HTMLElement | null>;
type UseClickOutsideCallback = MaybeRef<((event: MouseEvent) => void) | (() => void)>;
type useClickOutsideListener = {
    element: UseClickOutsideElement;
    callback: UseClickOutsideCallback;
};

const clickOutsideListeners: useClickOutsideListener[] = [];

function handleGlobalClickOutside(event: MouseEvent) {
    clickOutsideListeners.forEach(({ element, callback }) => {
        const fn = unref(callback);
        const elements = Array.isArray(element)
            ? element.map(unrefHTMLElement)
            : [unrefHTMLElement(element)];

        const someElementIsVisible = elements.some((element) => element && isVisible(element));
        if (!someElementIsVisible) {
            return;
        }

        const target = event.target as HTMLElement;
        const someElementContainsTarget = elements.some(
            (element) => element && (element === target || element.contains(target))
        );
        if (someElementContainsTarget) {
            return;
        }

        fn(event);
    });
}

// Register the global listener once
export function registerGlobalClickOutsideListener() {
    if (typeof window !== 'undefined') {
        on(window.document, 'mousedown', handleGlobalClickOutside);
    }
}

// Unregister the global listener if no elements are left
export function unregisterGlobalClickOutsideListener() {
    if (typeof window !== 'undefined') {
        off(window.document, 'mousedown', handleGlobalClickOutside);
    }
}

export function useClickOutside(
    element: UseClickOutsideElement,
    callback: UseClickOutsideCallback
) {
    if (typeof window === 'undefined') return () => {};

    // Add the element-callback pair to the list
    clickOutsideListeners.push({ element, callback });

    // If it's the first element, register the global listener
    if (clickOutsideListeners.length === 1) {
        registerGlobalClickOutsideListener();
    }

    // Return a function to remove this specific listener
    return () => {
        const index = clickOutsideListeners.findIndex(
            (pair) => pair.element === element && pair.callback === callback
        );

        if (index > -1) {
            clickOutsideListeners.splice(index, 1);
        }

        // Unregister the global listener if no elements are left
        if (clickOutsideListeners.length === 0) {
            unregisterGlobalClickOutsideListener();
        }
    };
}
