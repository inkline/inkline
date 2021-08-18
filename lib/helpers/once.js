import { off } from './off';
import { on } from './on';
export const once = function (el, event, fn) {
    const listener = function () {
        if (fn) {
            // @ts-ignore
            fn.apply(this, arguments); // eslint-disable-line no-invalid-this
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};
//# sourceMappingURL=once.js.map