import {
    VariantPropertyMixin,
    EmitClickMethodMixin,
    ClassesProviderMixin,
} from '@inkline/inkline/src/mixins';

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
