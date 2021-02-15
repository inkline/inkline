import {
    LinkableMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IListGroupItem',
    mixins: [
        LinkableMixin
    ],
    props: {
        active: {
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
        tag: {
            type: String,
            default: 'div'
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
            }
        },
        tabIndex() {
            return this.disabled ? -1 : this.tabindex;
        }
    }
};
