import { breakpointKeys } from '@inkline/inkline/src/constants';
import { breakpointClass, capitalizeFirst } from '@inkline/inkline/src/helpers';

const properties = {};
for (let breakpoint of breakpointKeys) {
    for (let property of ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between', 'reverse']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
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
            const responsiveClasses = Object.keys(properties)
                .reduce((acc, property) => {
                    if (this[property]) {
                        acc[breakpointClass(`-${property}`, this[property])] = true;
                    }

                    return acc;
                }, {});


            return {
                '-no-gutter': this.noGutter,
                '-no-collapse': this.noCollapse,
                ...responsiveClasses
            };
        }
    }
};
