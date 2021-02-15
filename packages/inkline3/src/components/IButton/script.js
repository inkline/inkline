import ILoader from '@inkline/inkline/src/components/ILoader/index.vue';
import { LinkableMixin, sizePropValidator, colorVariantClass } from '@inkline/inkline/src/mixins';

export default {
    name: 'IButton',
    mixins: [
        LinkableMixin
    ],
    components: {
        ILoader,
    },
    props: {
        active: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        link: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        outline: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'button'
        },
        tabindex: {
            type: [Number, String],
            default: 1
        },
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        }
    },
    inject: {
        parentForm: {
            default: () => ({})
        },
        parentFormGroup: {
            default: () => ({})
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-active': this.active,
                '-block': this.block,
                '-circle': this.circle,
                '-disabled': this.isDisabled,
                '-link': this.link,
                '-outline': this.outline
            }
        },
        isDisabled() {
            return this.disabled || (this.parentForm || {}).disabled || (this.parentFormGroup || {}).disabled;
        },
        tabIndex() {
            return this.isDisabled ? -1 : this.tabindex;
        }
    }
};
