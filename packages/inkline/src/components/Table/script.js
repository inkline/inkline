import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'ITable',
    mixins: [
        ClassesProviderMixin,

        VariantPropertyMixin
    ],
    props: {
        bordered: {
            type: Boolean,
            default: false
        },
        condensed: {
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
            default: true
        },
        nowrap: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-bordered': this.bordered,
            '-condensed': this.condensed,
            '-striped': this.striped,
            '-hover': this.hover,
            '-nowrap': this.nowrap,
        }));

        this.classesProvider.add('wrapper', () => ({
            [`-responsive${typeof this.responsive === "boolean" ? '' : `-${this.responsive}`}`]: Boolean(this.responsive)
        }));
    }
};
