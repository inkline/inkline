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
            tabs: [
                { id: 'props', title: 'Props', icon: '' },
                { id: 'slots', title: 'Slots', icon: '' },
                { id: 'events', title: 'Events', icon: '' }
            ],
            mode: 'api'
        };
    }
};
