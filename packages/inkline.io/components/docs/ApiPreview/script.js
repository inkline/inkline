import ICodePreview from '../CodePreview';

export default {
    name: 'IApiPreview',
    extends: ICodePreview,
    props: {
        defaultActive: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: this.defaultActive || 'props',
            icons: false,
            tabs: [
                { id: 'props', title: 'Props' },
                { id: 'slots', title: 'Slots' },
                { id: 'events', title: 'Events' }
            ],
            mode: 'api'
        };
    }
};
