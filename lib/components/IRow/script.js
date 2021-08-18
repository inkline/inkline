import { defineComponent } from 'vue';
import { breakpointKeys } from '../../constants';
import { breakpointClass, capitalizeFirst } from '../../helpers';
/**
 * @name default
 * @kind slot
 * @description Slot for default row content
 */
/**
 * @name start
 * @kind member
 * @description Justify the content to the start of the row
 * @type Boolean
 * @default false
 */
/**
 * @name start-xs
 * @kind member
 * @description Justify the content to the start of the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name start-sm
 * @kind member
 * @description Justify the content to the start of the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name start-md
 * @kind member
 * @description Justify the content to the start of the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name start-lg
 * @kind member
 * @description Justify the content to the start of the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name start-xl
 * @kind member
 * @description Justify the content to the start of the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name start-xxl
 * @kind member
 * @description Justify the content to the start of the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name center
 * @kind member
 * @description Justify the content to the center of the row
 * @type Boolean
 * @default false
 */
/**
 * @name center-xs
 * @kind member
 * @description Justify the content to the center of the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name center-sm
 * @kind member
 * @description Justify the content to the center of the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name center-md
 * @kind member
 * @description Justify the content to the center of the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name center-lg
 * @kind member
 * @description Justify the content to the center of the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name center-xl
 * @kind member
 * @description Justify the content to the center of the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name center-xxl
 * @kind member
 * @description Justify the content to the center of the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name end
 * @kind member
 * @description Justify the content to the end of the row
 * @type Boolean
 * @default false
 */
/**
 * @name end-xs
 * @kind member
 * @description Justify the content to the end of the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name end-sm
 * @kind member
 * @description Justify the content to the end of the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name end-md
 * @kind member
 * @description Justify the content to the end of the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name end-lg
 * @kind member
 * @description Justify the content to the end of the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name end-xl
 * @kind member
 * @description Justify the content to the end of the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name end-xxl
 * @kind member
 * @description Justify the content to the end of the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name around
 * @kind member
 * @description Justify the content to have space around each item inside the row
 * @type Boolean
 * @default false
 */
/**
 * @name around-xs
 * @kind member
 * @description Justify the content to have space around each item inside the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-sm
 * @kind member
 * @description Justify the content to have space around each item inside the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-md
 * @kind member
 * @description Justify the content to have space around each item inside the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-lg
 * @kind member
 * @description Justify the content to have space around each item inside the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-xl
 * @kind member
 * @description Justify the content to have space around each item inside the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-xxl
 * @kind member
 * @description Justify the content to have space around each item inside the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name around
 * @kind member
 * @description Justify the content to have space around each item inside the row
 * @type Boolean
 * @default false
 */
/**
 * @name around-xs
 * @kind member
 * @description Justify the content to have space around each item inside the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-sm
 * @kind member
 * @description Justify the content to have space around each item inside the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-md
 * @kind member
 * @description Justify the content to have space around each item inside the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-lg
 * @kind member
 * @description Justify the content to have space around each item inside the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-xl
 * @kind member
 * @description Justify the content to have space around each item inside the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name around-xxl
 * @kind member
 * @description Justify the content to have space around each item inside the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name top
 * @kind member
 * @description Align the content to the top of the row
 * @type Boolean
 * @default false
 */
/**
 * @name top-xs
 * @kind member
 * @description Align the content to the top of the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name top-sm
 * @kind member
 * @description Align the content to the top of the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name top-md
 * @kind member
 * @description Align the content to the top of the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name top-lg
 * @kind member
 * @description Align the content to the top of the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name top-xl
 * @kind member
 * @description Align the content to the top of the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name top-xxl
 * @kind member
 * @description Align the content to the top of the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name middle
 * @kind member
 * @description Align the content to the middle of the row
 * @type Boolean
 * @default false
 */
/**
 * @name middle-xs
 * @kind member
 * @description Align the content to the middle of the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name middle-sm
 * @kind member
 * @description Align the content to the middle of the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name middle-md
 * @kind member
 * @description Align the content to the middle of the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name middle-lg
 * @kind member
 * @description Align the content to the middle of the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name middle-xl
 * @kind member
 * @description Align the content to the middle of the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name middle-xxl
 * @kind member
 * @description Align the content to the middle of the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name bottom
 * @kind member
 * @description Align the content to the bottom of the row
 * @type Boolean
 * @default false
 */
/**
 * @name bottom-xs
 * @kind member
 * @description Align the content to the bottom of the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name bottom-sm
 * @kind member
 * @description Align the content to the bottom of the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name bottom-md
 * @kind member
 * @description Align the content to the bottom of the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name bottom-lg
 * @kind member
 * @description Align the content to the bottom of the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name bottom-xl
 * @kind member
 * @description Align the content to the bottom of the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name bottom-xxl
 * @kind member
 * @description Align the content to the bottom of the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name reverse
 * @kind member
 * @description Order the content in reverse order inside the row
 * @type Boolean
 * @default false
 */
/**
 * @name reverse-xs
 * @kind member
 * @description Order the content in reverse order inside the row on extra-small screens
 * @type Boolean
 * @default false
 */
/**
 * @name reverse-sm
 * @kind member
 * @description Order the content in reverse order inside the row on small screens
 * @type Boolean
 * @default false
 */
/**
 * @name reverse-md
 * @kind member
 * @description Order the content in reverse order inside the row on medium screens
 * @type Boolean
 * @default false
 */
/**
 * @name reverse-lg
 * @kind member
 * @description Order the content in reverse order inside the row on large screens
 * @type Boolean
 * @default false
 */
/**
 * @name reverse-xl
 * @kind member
 * @description Order the content in reverse order inside the row on extra-large screens
 * @type Boolean
 * @default false
 */
/**
 * @name reverse-xxl
 * @kind member
 * @description Order the content in reverse order inside the row on extra-extra-large screens
 * @type Boolean
 * @default false
 */
const properties = {};
for (let breakpoint of breakpointKeys) {
    for (let property of ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between', 'reverse']) {
        properties[`${property}${capitalizeFirst(breakpoint)}`] = {
            type: Boolean,
            default: false
        };
    }
}
const componentName = 'IRow';
export default defineComponent({
    name: componentName,
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
});
//# sourceMappingURL=script.js.map