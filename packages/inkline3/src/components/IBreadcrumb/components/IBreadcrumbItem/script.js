import { LinkableMixin } from '@inkline/inkline/src/mixins';

export default {
    name: 'IBreadcrumbItem',
    mixins: [
        LinkableMixin
    ],
    props: {
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tabindex: {
            type: [Number, String],
            default: 1
        }
    },
    computed: {
        classes() {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            };
        },
        tabIndex() {
            return this.disabled || this.active ? -1 : this.tabindex;
        }
    }
};
