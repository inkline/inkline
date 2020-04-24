import {
    ClassesProviderMixin,
    InjectParentFormProviderMixin,
    SizePropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IFormLabel',
    mixins: [
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        SizePropertyMixin,
    ],
    props: {
        placement: {
            type: String,
            default: 'default'
        }
    },
    methods: {
        focusInput() {
            const siblings = this.$parent.$children;
            const selfIndex = siblings.indexOf(this);

            const input = siblings.find(
                (sibling, index) => index > selfIndex && sibling.hasOwnProperty('focusInputRef'));

            if (input) {
                input.focusInputRef();
            }
        }
    },
    created() {
        this.classesProvider.add(() => ({
            [`-${this.placement}`]: this.placement !== 'default'
        }));
    }
};
