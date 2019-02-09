import { IButton, IButtonGroup } from '@inkline/inkline';

export default {
    name: 'ICodePreview',
    components: {
        IButton,
        IButtonGroup
    },
    data() {
        return {
            active: this.defaultActive || 'default',
            tabs: [
                { id: 'default', title: 'Preview' },
                { id: 'html', title: 'HTML' },
                { id: 'css', title: 'CSS' },
                { id: 'js', title: 'JS' },
                { id: 'output', title: 'Output' }
            ]
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
    }
};
