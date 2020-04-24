import { IButton, IButtonGroup } from '@inkline/inkline/src/index';
import {
    ClassesProviderMixin,
    VariantPropertyMixin
} from "@inkline/inkline/src/mixins";

export default {
    name: 'ICodePreview',
    mixins: [
        ClassesProviderMixin,
        VariantPropertyMixin
    ],
    components: {
        IButton,
        IButtonGroup
    },
    data() {
        return {
            active: this.defaultActive || 'default',
            tabs: [
                { id: 'default', title: 'Preview', icon: 'eye' },
                { id: 'html', title: 'HTML', icon: ['fab', 'html5'] },
                { id: 'css', title: 'CSS', icon: ['fab', 'css3'] },
                { id: 'js', title: 'JS', icon: ['fab', 'js'] },
                { id: 'output', title: 'Output', icon: 'terminal' }
            ],
            mode: 'code'
        };
    },
    props: {
        defaultActive: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        link: {
            type: String,
            default: ''
        },
        header: {
            type: Boolean,
            default: true
        },
        expanded: {
            type: Boolean,
            default: false
        },
        markup: {
            type: String,
            default: ''
        }
    },
    methods: {
        setActive(id) {
            this.active = id;
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-expanded': this.expanded,
            '-no-header': this.header === false
        }));
    }
};
