import { breakpoints } from '../../constants';
import { breakpointClass, capitalizeFirst, modifierClass } from '../../helpers';

const properties = {};
for (let breakpoint of breakpoints) {
    if (breakpoint !== '') {
        properties[breakpoint] = {
            type: [String, Boolean, Number],
            default: false
        };
    }

    for (let property of ['first', 'last']) {
        properties[property + capitalizeFirst(breakpoint)] = {
            type: Boolean,
            default: false
        };
    }

    for (let property of ['offset', 'push', 'pull']) {
        properties[property + capitalizeFirst(breakpoint)] = {
            type: [String, Boolean, Number],
            default: false
        };
    }
}

export default {
    name: 'Column',
    props: {
        ...properties
    },
    computed: {
        classes: function () {
            return [
                ...Object.keys(properties).map((p) => this[p] ? breakpointClass(modifierClass(p), this[p]) : '')
            ];
        }
    }
};
