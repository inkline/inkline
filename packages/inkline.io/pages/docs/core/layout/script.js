import View from '@components/View';
import { ILayout, ILayoutHeader, ILayoutContent, ILayoutAside, ILayoutFooter } from '@inkline/inkline';

export default {
    name: 'LayoutView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Layout'
    },
    components: {
        ILayout,
        ILayoutHeader,
        ILayoutContent,
        ILayoutAside,
        ILayoutFooter
    }
};
