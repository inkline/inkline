import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

export default {
    name: 'IIcon',
    mixins: [
        ClassesProviderMixin
    ],
    props: {
        icon: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        }
    },
    created() {
        this.classesProvider.add(() => ({
            [`-${this.icon}`]: Boolean(this.icon),
            [`-${this.size}`]: Boolean(this.size)
        }));
    }
};
