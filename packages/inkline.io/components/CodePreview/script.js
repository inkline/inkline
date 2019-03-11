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
                { id: 'default', title: 'Preview', icon: 'eye' },
                { id: 'html', title: 'HTML', icon: ['fab', 'html5'] },
                { id: 'css', title: 'CSS', icon: ['fab', 'css3'] },
                { id: 'js', title: 'JS', icon: ['fab', 'js'] },
                { id: 'output', title: 'Output', icon: 'terminal' }
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
