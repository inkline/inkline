import { breakpointClassValidator } from '../../validators';
import { breakpointClass } from '../../helpers';

export default {
    name: 'Column',
    props: {
        noGutter: {
            type: Boolean,
            default: false
        },
        noColapse: {
            type: Boolean,
            default: false
        },
        start: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        center: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        end: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        top: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        middle: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        bottom: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        around: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        between: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        },
        reverse: {
            type: [Boolean, String],
            default: false,
            validator: breakpointClassValidator
        }
    },
    computed: {
        classes: function () {
            return [
                this.noGutter ? '-no-gutter' : '',
                this.noColapse ? '-no-colapse' : '',
                breakpointClass('-start', this.start),
                breakpointClass('-center', this.center),
                breakpointClass('-end', this.end),
                breakpointClass('-top', this.top),
                breakpointClass('-middle', this.middle),
                breakpointClass('-bottom', this.bottom),
                breakpointClass('-around', this.around),
                breakpointClass('-between', this.between),
                breakpointClass('-reverse', this.reverse)
            ];
        }
    }
};
