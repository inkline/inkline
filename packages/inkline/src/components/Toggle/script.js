import ICheckable from '@inkline/inkline/src/components/ICheckable';
import {
    SchemaProviderMixin,
    NamePropertyMixin,
    VariantPropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IToggle',
    extends: ICheckable,
    mixins: [
        SchemaProviderMixin,

        NamePropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onChange(event) {
            if (this.readonly || this.disabled) { return; }

            this.$emit('input', event.target.checked);
        }
    }
};
