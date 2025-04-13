import { off } from './off';
import { on } from './on';

export const once = function (el: HTMLElement | Document | Window, event: string, fn: any): void {
    const listener = function (...args: any[]) {
        if (fn) {
            // @ts-ignore
            fn.apply(this, args); // eslint-disable-line no-invalid-this
        }

        off(el, event, listener);
    };

    on(el, event, listener);
};
