import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

import IContainer from "@inkline/inkline/src/components/Container";
import IRow from '../Row';
import IColumn from '../Column';

export default {
    name: 'IHeader',
    mixins: [
        SizePropertyMixin,

        ClassesProviderMixin
    ],
    components: {
        IContainer,
        IRow,
        IColumn
    },
    props: {
        cover: {
            type: Boolean,
            default: true
        },
        fluid: {
            type: Boolean,
            default: false
        },
        fullscreen: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-cover': this.cover,
            '-fullscreen': this.fullscreen
        }));
    }
};
