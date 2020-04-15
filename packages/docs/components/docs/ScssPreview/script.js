import ICodePreview from '../CodePreview';

export default {
    name: 'IScssPreview',
    extends: ICodePreview,
    props: {
        defaultActive: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: this.defaultActive || 'scss',
            icons: true,
            tabs: [
                { id: 'scss', title: 'Variables', icon: ['fab', 'sass'] },
            ]
        };
    }
};
