import IButtonGroup from '@inkline/inkline/src/components/IButtonGroup';
import IButton from '@inkline/inkline/src/components/IButton';
import {
    AttributesProviderMixin,
    ClassesProviderMixin,
    VariantPropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ITabs',
    components: {
        IButtonGroup,
        IButton,
        CustomSlot: {
            functional: true,
            render: (h, ctx) => h('div', {}, ctx.props.components)
        }
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        VariantPropertyMixin
    ],
    props: {
        custom: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        stretch: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: null,
            tabs: []
        }
    },
    provide() {
        return {
            tabs: this
        };
    },
    methods: {
        onHeadingClick(item) {
            this.active = item.id;
            this.$emit('input', this.active);
        },
        initElements() {
            this.tabs = this.$children.filter((tab) => tab.$options.name === 'ITab');

            if (!this.active && this.tabs.length > 0) {
                if (this.value) {
                    return this.active = this.value;
                }

                this.active = this.tabs[0].id;
                this.$emit('input', this.active);
            }
        }
    },
    watch: {
        value(value) {
            this.active = value;
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-custom': this.custom,
            '-stretch': this.stretch
        }));
    },
    mounted() {
        this.$on('init', this.initElements);

        this.initElements();
    }
};
