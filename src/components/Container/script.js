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
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-fluid': this.fluid
            }));
        }
    }
};
