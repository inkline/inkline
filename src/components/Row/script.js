import { breakpoints } from 'inkline/constants';
import { breakpointClass, capitalizeFirst, modifierClass } from 'inkline/helpers';

const properties = {};
for (let breakpoint of breakpoints) {
    for (let property of ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between', 'reverse']) {
        properties[property + capitalizeFirst(breakpoint)] = {
            type: Boolean,
            default: false
        };
    }
}

export default {
    name: 'IRow',
    props: {
        noGutter: {
            type: Boolean,
            default: false
        },
        noCollapse: {
            type: Boolean,
            default: false
        },
        ...properties
    },
    computed: {
        classes() {
            return [
                this.noGutter ? '-no-gutter' : '',
                this.noCollapse ? '-no-collapse' : '',

                ...Object.keys(properties)
                    .map((p) => this[p] ? breakpointClass(modifierClass(p), this[p]) : '')
            ].filter((p) => p !== '');
        }
    }
};
