import { breakpointKeys } from '@/constants';
import { breakpointClass, capitalizeFirst } from '@/helpers';

const properties = {};
for (let breakpoint of breakpointKeys) {
    if (breakpoint !== '') {
        properties[breakpoint] = {
            type: [String, Boolean, Number],
            default: false
        };
    }

    for (let property of ['first', 'last']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
            type: Boolean,
            default: false
        };
    }

    for (let property of ['offset', 'push', 'pull']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
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
            return Object.keys(properties)
                .reduce((acc, property) => {
                    if (this[property]) {
                        acc[breakpointClass(`-${property}`, this[property])] = true;
                    }

                    return acc;
                }, {});
        }
    }
};
