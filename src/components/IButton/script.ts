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
 * @name default
 * @kind slot
 * @description Slot for default button content
 */

/**
 * @name loading
 * @kind slot
 * @description Slot for button loading state
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
    props: {
        /**
         * @description The active state of the button
         * @type Boolean
         * @default false
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the button as a block, spanning the full container width
         * @type Boolean
         * @default false
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the button as a circle
         * @type Boolean
         * @default false
         */
        circle: {
            type: Boolean,
            default: false
        },
        /**
         * @description The color variant of the button
         * @type primary | success | light | dark | info | success | warning | danger | facebook | google | twitter | github
         * @default light
         */
        color: {
            type: String,
            default: defaultPropValue<string>(componentName, 'color')
        },
        /**
         * @description The disabled state of the button
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the button as a link
         * @type Boolean
         * @default false
         */
        link: {
            type: Boolean,
            default: false
        },
        /**
         * @description The loading state of the button
         * @type Boolean
         * @default false
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * @description Display the button as an outline button
         * @type Boolean
         * @default false
         */
        outline: {
            type: Boolean,
            default: false
        },
        /**
         * @description Set the HTML tag to be used for rendering the button
         * @type String
         * @default button
         */
        tag: {
            type: String,
            default: 'button'
        },
        /**
         * @description The tabindex of the button
         * @type Number | String
         * @default 1
         */
        tabindex: {
            type: [Number, String],
            default: 1
        },
        /**
         * @description The size variant of the button
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: defaultPropValue<string>(componentName, 'size'),
            validator: sizePropValidator
        }
    },
    computed: {
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
        tabIndex (): number | string {
            return this.isDisabled ? -1 : this.tabindex;
        }
    }
});
