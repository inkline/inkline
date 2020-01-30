import { breakpointKeys } from '@inkline/inkline/src/constants';
import { breakpointClass, capitalizeFirst, modifierClass } from '@inkline/inkline/src/helpers';

const properties = {};
for (let breakpoint of breakpointKeys) {
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
            type: [String, Number],
            default: ''
        };
    }
}

export default {
    name: 'IColumn',
    props: properties,
    computed: {
        classes() {
            return [
                ...Object.keys(properties)
                    .map((p) => this[p] ? breakpointClass(modifierClass(p), this[p]) : '')
            ].filter((p) => p !== '');
        }
    }
};
