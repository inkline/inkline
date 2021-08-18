import { defineComponent } from 'vue';
import IContainer from '../IContainer/index.vue';
import IRow from '../IRow/index.vue';
import IColumn from '../IColumn/index.vue';
import IHamburgerMenu from '../IHamburgerMenu/index.vue';
import { CollapsibleMixin, defaultPropValue, colorVariantClass, sizePropValidator, } from '../../mixins';
import { ClickOutside } from '../../directives';
/**
 * @name default
 * @kind slot
 * @description Slot for default navbar content
 */
const componentName = 'INavbar';
export default defineComponent({
    name: componentName,
    components: {
        IContainer,
        IRow,
        IColumn,
        IHamburgerMenu
    },
    directives: {
        ClickOutside
    },
    mixins: [
        CollapsibleMixin
    ],
    props: {
        /**
         * @description Determines if the navbar should close when clicking a navbar item
         * @type Boolean
         * @default true
         */
        collapseOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * @description Determines if the navbar should close when clicking outside
         * @type Boolean
         * @default true
         */
        collapseOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * @description The color variant of the navbar
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue(componentName, 'color')
        },
        /**
         * @description Display the inner container as fluid, spanning 100% width
         * @type Boolean
         * @default false
         */
        fluid: {
            type: Boolean,
            default: false
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
        /**
         * @description The animation of the hamburger menu component used for collapsing
         * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
         * @default close
         */
        menuAnimation: {
            type: String,
            default: 'close'
        }
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
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    },
    methods: {
        onItemClick() {
            if (this.collapseOnItemClick && this.open) {
                this.setOpen(false);
            }
        },
        onClickOutside() {
            if (this.collapseOnClickOutside && this.open) {
                this.setOpen(false);
            }
        }
    }
});
//# sourceMappingURL=script.js.map