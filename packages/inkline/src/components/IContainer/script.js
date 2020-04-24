import {
    ClassesProviderMixin,
} from '@inkline/inkline/src/mixins';

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
    created() {
        this.classesProvider.add(() => ({
            '-fluid': this.fluid
        }));
    }
};
