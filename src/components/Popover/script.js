import { uid } from '@inkline/inkline/src/helpers';

import Tooltip from '../Tooltip';

export default {
    name: 'IPopover',
    extends: Tooltip,
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
