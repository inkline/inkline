import { defineComponent } from 'vue';
import {
    CollapsibleMixin,
    defaultPropValue,
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default sidebar content
 * @name default
 * @kind slot
 */

const componentName = 'ISidebar';

export default defineComponent({
    name: componentName,
    mixins: [
        CollapsibleMixin
    ],
    provide (): { sidebar: any } {
        return {
            sidebar: this
        };
    },
    inheritAttrs: false,
    props: {
        /**
         * The aria-label of the sidebar
         * @type String
         * @default Sidebar
         * @name ariaLabel
         */
        ariaLabel: {
            type: String,
            default: 'Sidebar'
        },
        /**
         * Determines if the sidebar should close when clicking a sidebar item
         * @type Boolean
         * @default true
         * @name collapseOnItemClick
         */
        collapseOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * Determines if the sidebar should close when clicking outside, on the overlay
         * @type Boolean
         * @default true
         * @name collapseOnClickOutside
         */
        collapseOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * The collapse position of the sidebar
         * @type fixed | absolute | relative
         * @default absolute
         * @name collapsePosition
         */
        collapsePosition: {
            type: String,
            default: 'absolute'
        },
        /**
         * The color variant of the sidebar
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The placement of the sidebar
         * @type left | right
         * @default left
         * @name placement
         */
        placement: {
            type: String,
            default: 'left'
        },
        /**
         * The size variant of the navbar
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    computed: {
        classes (): Classes {
            return {
                ...this.collapsibleClasses,
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                [`-collapse-${this.collapsePosition}`]: true,
                [`-placement-${this.placement}`]: true
            };
        },
        sidebarWrapperTransition (): string {
            return this.collapsePosition !== 'relative'
                ? 'sidebar-wrapper-none-transition'
                : 'sidebar-wrapper-transition';
        },
        sidebarTransition (): string {
            return this.collapsePosition !== 'relative'
                ? 'sidebar-transition'
                : 'sidebar-none-transition';
        }
    },
    methods: {
        onItemClick () {
            if (this.collapseOnItemClick && this.open) {
                this.setOpen(false);
            }
        },
        onOverlayClick () {
            if (this.collapseOnClickOutside && this.open) {
                this.setOpen(false);
            }
        }
    }
});
