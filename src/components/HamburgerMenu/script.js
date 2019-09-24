import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';
import EmitClickMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitClickMethodMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

export default {
    name: 'IHamburgerMenu',
    mixins: [
        ClassesProviderMixin,
        EmitClickMethodMixin,
        VariantPropertyMixin,
    ],
    props: {
        active: {
            type: Boolean,
            default: false
        },
        animation: {
            type: String,
            default: 'close'
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-active': this.active,
            [`-${this.animation}`]: true
        }));
    }
};
