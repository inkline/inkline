import { off } from './off';
import { on } from './on';

export const once = function(el, event, fn) {
    const listener = function() {
        if (fn) {
            fn.apply(this, arguments);
        }

        off(el, event, listener);
    };

    on(el, event, listener);
};