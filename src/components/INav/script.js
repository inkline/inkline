import {
    colorVariantClass,
    sizePropValidator,
} from '@inkline/inkline/src/mixins';

/**
 * @name default
 * @kind slot
 * @description Slot for default nav content
 */

export default {
    name: 'INav',
    props: {
        /**
         * @description The color variant of the nav
         * @type light | dark
         * @default light
         */
        color: {
            type: String,
            default: '',
        },
        /**
         * @description The size variant of the nav
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        },
        /**
         * @description Display the nav with vertical orientation
         * @type Boolean
         * @default false
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },
    provide() {
        return {
            nav: this
        };
    },
    inject: {
        navbar: {
            default: () => ({})
        },
        sidebar: {
            default: () => ({})
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-vertical': this.vertical,
            };
        }
    },
    methods: {
        onItemClick() {
            [this.navbar, this.sidebar].forEach((parent) => {
                if (parent.onItemClick) {
                    parent.onItemClick();
                }
            });
        }
    }
};
