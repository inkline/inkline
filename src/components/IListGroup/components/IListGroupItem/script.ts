import { defineComponent } from 'vue';
import {
    LinkableMixin
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default list group item content
 * @name default
 * @kind slot
 */

const componentName = 'IListGroupItem';

export default defineComponent({
    name: componentName,
    mixins: [
        LinkableMixin
    ],
    inheritAttrs: false,
    props: {
        /**
         * The active state of the list group item
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * The disabled state of the list group item
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the list group item
         * @type String
         * @default div
         * @name tag
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * The tabindex of the list group item
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        ariaDisabled () {
            if (this.role === 'link') {
                return null;
            }

            return this.disabled ? 'true' : 'false';
        },
        classes (): Classes {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            };
        },
        role (): string {
            return this.$attrs.to || this.$attrs.href ? 'link' : 'listitem';
        },
        tabIndex (): number | string {
            return this.disabled ? -1 : this.tabindex;
        }
    }
});
