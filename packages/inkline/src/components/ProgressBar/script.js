import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'IProgressBar',
    mixins: [
        ClassesProviderMixin,

        VariantPropertyMixin,
    ],
    props: {
        min: {
            type: String | Number,
            default: 0
        },
        max: {
            type: String | Number,
            default: 100
        },
        value: {
            type: String | Number,
            default: 0
        }
    },
    computed: {
        progress() {
            const min = typeof this.min === 'string' ? parseFloat(this.min) : this.min;
            const value = typeof this.value === 'string' ? parseFloat(this.value.replace('%', '')) : this.value;
            const max = typeof this.max === 'string' ? parseFloat(this.max) : this.max;

            return (value - min) * 100 / (max - min);
        },
        style() {
            return `width: ${this.progress}%`;
        }
    }
};