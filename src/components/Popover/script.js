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
        return {
            id: this.$attrs.id || uid('popover')
        };
    },
    methods: {
        initAriaAttributes() {
            this.popupElement.setAttribute('id', this.id);
            this.triggerElement.setAttribute('aria-haspopup', 'popover');
            this.triggerElement.setAttribute('aria-controls', this.id);
        }
    }
};
