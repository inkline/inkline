import { uid } from 'inkline/helpers';

import Tooltip from '../Tooltip';

export default {
    name: 'IPopover',
    extends: Tooltip,
    props: {
        trigger: {
            type: String,
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
