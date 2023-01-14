import { defineComponent } from 'vue';
import ILoader from '@inkline/inkline/components/ILoader/index.vue';
import {
    LinkableMixin,
    sizePropValidator,
    colorVariantClass,
    defaultPropValue
} from '@inkline/inkline/mixins';
import { Classes } from '@inkline/inkline/types';

/**
 * Slot for default button content
 * @name default
 * @kind slot
 */

/**
 * Slot for button loading state
 * @name loading
 * @kind slot
 */

const componentName = 'IButton';

export default defineComponent({
    name: componentName,
    components: {
        ILoader
    },
    mixins: [
        LinkableMixin
    ],
    inject: {
        buttonGroup: {
            default: () => ({})
        },
        form: {
            default: () => ({})
        },
        formGroup: {
            default: () => ({})
        }
    },
    inheritAttrs: false,
    props: {
        /**
         * The active state of the button
         * @type Boolean
         * @default false
         * @name active
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a block, spanning the full container width
         * @type Boolean
         * @default false
         * @name block
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a circle
         * @type Boolean
         * @default false
         * @name circle
         */
        circle: {
            type: Boolean,
            default: false
        },
        /**
         * The color variant of the button
         * @type primary | success | light | dark | info | success | warning | danger | facebook | google | twitter | github
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * The disabled state of the button
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as a link
         * @type Boolean
         * @default false
         * @name link
         */
        link: {
            type: Boolean,
            default: false
        },
        /**
         * The loading state of the button
         * @type Boolean
         * @default false
         * @name loading
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * Display the button as an outline button
         * @type Boolean
         * @default false
         * @name outline
         */
        outline: {
            type: Boolean,
            default: false
        },
        /**
         * Set the HTML tag to be used for rendering the button
         * @type String
         * @default button
         * @name tag
         */
        tag: {
            type: String,
            default: 'button'
        },
        /**
         * The tabindex of the button
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        },
        /**
         * The size variant of the button
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
    computed: {
        ariaBusy () {
            if (this.role !== 'button') {
                return null;
            }

            return this.loading ? 'true' : 'false';
        },
        ariaDisabled () {
            if (this.role !== 'button') {
                return null;
            }

            return this.disabled ? 'true' : 'false';
        },
        ariaPressed () {
            if (this.role !== 'button') {
                return null;
            }

            return this.active ? 'true' : 'false';
        },
        classes (): Classes {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-active': this.active,
                '-block': this.block,
                '-circle': this.circle,
                '-disabled': this.isDisabled,
                '-link': this.link,
                '-outline': this.outline
            };
        },
        isDisabled (): boolean {
            return this.disabled || (this as any).buttonGroup.disabled || (this as any).form.disabled || (this as any).formGroup.disabled;
        },
        role (): string {
            return this.$attrs.to || this.$attrs.href ? 'link' : 'button';
        },
        tabIndex (): number | string {
            return this.isDisabled ? -1 : this.tabindex;
        }
    }
});
