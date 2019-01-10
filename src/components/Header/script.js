import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

export default {
    name: 'IContainer',
    mixins: [
        ClassesProviderMixin
    ],
    props: {
        fluid: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.classesProvider.add(() => ({
            '-fluid': this.fluid
        }));
    }
};
