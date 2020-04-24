import { uid } from '@inkline/inkline/src/helpers';

import ITooltip from '@inkline/inkline/src/components/ITooltip';

export default {
    name: 'IPopover',
    extends: ITooltip,
    props: {
        trigger: {
            type: [String, Array],
            default: 'click'
        }
    },
    data() {
        const basename = 'popover';
        return {
            id: this.$attrs.id || uid(basename),
            basename
        };
    }
};
