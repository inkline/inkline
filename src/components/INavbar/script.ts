import { defineComponent } from 'vue';
import IContainer from '@inkline/inkline/components/IContainer/index.vue';
import IRow from '@inkline/inkline/components/IRow/index.vue';
import IColumn from '@inkline/inkline/components/IColumn/index.vue';
import IHamburgerMenu from '@inkline/inkline/components/IHamburgerMenu/index.vue';
import {
    CollapsibleMixin,
    defaultPropValue,
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/mixins';
import { ClickOutside } from '@inkline/inkline/directives';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default navbar content
 * @name default
 * @kind slot
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
    provide (): { navbar: any } {
        return {
            navbar: this
        };
    },
    inheritAttrs: false,
    props: {
        /**
         * Determines if the navbar should close when clicking a navbar item
         * @type Boolean
         * @default true
         * @name collapseOnItemClick
         */
        collapseOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * Determines if the navbar should close when clicking outside
         * @type Boolean
         * @default true
         * @name collapseOnClickOutside
         */
        collapseOnClickOutside: {
            type: Boolean,
            default: true
        },
        /**
         * The color variant of the navbar
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * Display the inner container as fluid, spanning 100% width
         * @type Boolean
         * @default false
         * @name fluid
         */
        fluid: {
            type: Boolean,
            default: false
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
        },
        /**
         * The animation of the hamburger menu component used for collapsing
         * @type close | arrow-up | arrow-down | arrow-left | arrow-right | plus | minus
         * @default close
         * @name menuAnimation
         */
        menuAnimation: {
            type: String,
            default: 'close'
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
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    },
    methods: {
        onItemClick () {
            if (this.collapseOnItemClick && this.open) {
                this.setOpen(false);
            }
        },
        onClickOutside () {
            if (this.collapseOnClickOutside && this.open) {
                this.setOpen(false);
            }
        }
    }
});
