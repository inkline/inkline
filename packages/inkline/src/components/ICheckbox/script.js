import ICheckable from '@inkline/inkline/src/components/ICheckable';
import {
    NamePropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ICheckbox',
    extends: ICheckable,
    mixins: [
        NamePropertyMixin
    ],
    props: {
        value: {
            type: [Boolean, String],
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        checked() {
            if (Array.isArray(this.model)) {
                return this.model.indexOf(this.currentValue) !== -1;
            } else if (this.model !== null && this.model !== undefined) {
                return this.model === this.currentValue;
            }
        }
    }
};
