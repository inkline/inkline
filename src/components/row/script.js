import validators from '../../validators';

export default {
    name: 'Row',
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
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        center: {
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        end: {
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        top: {
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        middle: {
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        bottom: {
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        around: {
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        between: {
            type: String,
            default: false,
            validator: validators.breakpoint
        },
        reverse: {
            type: String,
            default: false,
            validator: validators.breakpoint
        }
    }
};
