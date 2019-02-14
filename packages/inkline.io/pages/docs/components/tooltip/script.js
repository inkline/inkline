import View from '@components/View';
import { IButton, ITooltip } from '@inkline/inkline';

export default {
    name: 'TooltipView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Tooltip'
    },
    components: {
        IButton,
        ITooltip,
    }
};
