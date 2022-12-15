import {
    ClassesProviderMixin,
    EmitProviderMixin,
    SizePropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'INav',
    mixins: [
        ClassesProviderMixin,
        EmitProviderMixin,

        SizePropertyMixin,
    ],
    props: {
        tabs: {
            type: Boolean,
            default: false
        },
        vertical: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        dispatchItemClick(e) {
            ['INavbar', 'ISidebar'].forEach((componentName) => {
                this.dispatch(componentName, 'item-click', e);
            });
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-tabs': this.tabs,
            '-vertical': this.vertical
        }));

        this.$on('item-click', this.dispatchItemClick);
    },
    destroyed() {
        this.$off('item-click', this.dispatchItemClick);
    }
};
