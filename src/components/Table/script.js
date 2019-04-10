import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'ITable',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        bordered: {
            type: Boolean,
            default: false
        },
        striped: {
            type: Boolean,
            default: false
        },
        hover: {
            type: Boolean,
            default: false
        },
        responsive: {
            type: [Boolean, String],
            default: false
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-bordered': this.bordered,
            '-striped': this.striped,
            '-hover': this.hover,
        }));

        this.classesProvider.add('wrapper', () => ({
            [`-responsive${typeof this.responsive === "boolean" ? '' : `-${this.responsive}`}`]: Boolean(this.responsive)
        }));
    }
};