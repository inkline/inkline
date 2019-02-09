import View from '@components/View';
import { ILayout, ILayoutAside, ILayoutContent, ILayoutFooter, ILayoutHeader } from '@inkline/inkline';

export default {
    name: 'View',
    extends: View,
    components: {
        ILayout,
        ILayoutAside,
        ILayoutContent,
        ILayoutFooter,
        ILayoutHeader
    }
};
