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
        noColapse: {
            type: Boolean,
            default: false
        },
        ...properties
    },
    computed: {
        classes: function () {
            return [
                this.noGutter ? '-no-gutter' : '',
                this.noColapse ? '-no-colapse' : '',

                ...Object.keys(properties).map((p) => this[p] ? breakpointClass(modifierClass(p), this[p]) : '')
            ];
        }
    }
};
