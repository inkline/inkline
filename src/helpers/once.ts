/* eslint-disable no-invalid-this, @typescript-eslint/ban-ts-comment */
import { off } from './off';
import { on } from './on';

export const once = function (el: HTMLElement, event: string, fn: any): void {
    const listener = function (...args: any[]) {
        if (fn) {
            // @ts-ignore
            fn.apply(this, args);
        }

        off(el, event, listener);
    };

    on(el, event, listener);
};
