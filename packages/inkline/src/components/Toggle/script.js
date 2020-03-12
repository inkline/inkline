import Checkable from '@inkline/inkline/src/components/Checkable';
import SchemaProviderMixin from '@inkline/inkline/src/mixins/forms/providers/SchemaProviderMixin';

import NamePropertyMixin from '@inkline/inkline/src/mixins/forms/properties/NamePropertyMixin';

export default {
    name: 'IToggle',
    extends: Checkable,
    mixins: [
        SchemaProviderMixin,

        NamePropertyMixin
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
