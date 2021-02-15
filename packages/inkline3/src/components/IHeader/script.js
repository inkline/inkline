import {
    colorVariantClass,
    sizePropValidator
} from '@inkline/inkline/src/mixins';

import IContainer from '@inkline/inkline/src/components/IContainer/index.vue';
import IRow from '@inkline/inkline/src/components/IRow/index.vue';
import IColumn from '@inkline/inkline/src/components/IColumn/index.vue';

export default {
    name: 'IHeader',
    components: {
        IContainer,
        IRow,
        IColumn
    },
    props: {
        color: {
            type: String,
            default: ''
        },
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
        },
        size: {
            type: String,
            default: '',
            validator: sizePropValidator
        }
    },
    computed: {
        classes() {
            return {
                ...colorVariantClass(this),
                [`-${this.size}`]: Boolean(this.size),
                '-cover': this.cover,
                '-fullscreen': this.fullscreen
            };
        }
    }
}
