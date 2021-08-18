import { defineComponent } from 'vue';
import { CollapsibleMixin, defaultPropValue, colorVariantClass, sizePropValidator, } from '../../mixins';
/**
 * @name default
 * @kind slot
 * @description Slot for default sidebar content
 */
const componentName = 'ISidebar';
export default defineComponent({
    name: componentName,
    mixins: [
        CollapsibleMixin
    ],
    props: {
        /**
         * @description Determines if the sidebar should close when clicking a sidebar item
         * @type Boolean
         * @default true
         */
        collapseOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * @description Determines if the sidebar should close when clicking outside, on the overlay
         * @type Boolean
         * @default true
         */
        collapseOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * @description The collapse position of the sidebar
         * @type fixed | absolute | relative
         * @default absolute
         */
        collapsePosition: {
            type: String,
            default: 'absolute'
        },
        /**
         * @description The color variant of the sidebar
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description The placement of the sidebar
         * @type left | right
         * @default left
         */
        placement: {
            type: String,
            default: 'left'
        },
        /**
         * @description The size variant of the navbar
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue(componentName, 'size'),
            validator: sizePropValidator
        },
    },
    emits: [
        /**
         * @event update:modelValue
         * @description Event emitted for setting the modelValue
         */
        'update:modelValue'
    ],
    computed: {
        classes() {
            return {
                ...this.collapsibleClasses,
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                [`-collapse-${this.collapsePosition}`]: true,
                [`-placement-${this.placement}`]: true,
            };
        },
        sidebarWrapperTransition() {
            return this.collapsePosition !== 'relative' ?
                'sidebar-wrapper-none-transition' :
                'sidebar-wrapper-transition';
        },
        sidebarTransition() {
            return this.collapsePosition !== 'relative' ?
                'sidebar-transition' :
                'sidebar-none-transition';
        }
    },
    methods: {
        onItemClick() {
            if (this.collapseOnItemClick && this.open) {
                this.setOpen(false);
            }
        },
        onOverlayClick() {
            if (this.collapseOnClickOutside && this.open) {
                this.setOpen(false);
            }
        }
    }
});
//# sourceMappingURL=script.js.map