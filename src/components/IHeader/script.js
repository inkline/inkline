import {
    SizePropertyMixin,
    VariantPropertyMixin,
    ClassesProviderMixin
} from '@inkline/inkline/src/mixins';

import IContainer from "@inkline/inkline/src/components/IContainer";
import IRow from '@inkline/inkline/src/components/IRow';
import IColumn from '@inkline/inkline/src/components/IColumn';

export default {
    name: 'IHeader',
    mixins: [
        SizePropertyMixin,
        VariantPropertyMixin,
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
