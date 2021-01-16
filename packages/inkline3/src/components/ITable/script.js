export default {
    name: 'ITable',
    props: {
        bordered: {
            type: Boolean,
            default: false
        },
        condensed: {
            type: Boolean,
            default: false
        },
        striped: {
            type: Boolean,
            default: false
        },
        hover: {
            type: Boolean,
            default: false
        },
        responsive: {
            type: [Boolean, String],
            default: true
        },
        nowrap: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes() {
            return {
                '-bordered': this.bordered,
                '-condensed': this.condensed,
                '-striped': this.striped,
                '-hover': this.hover,
                '-nowrap': this.nowrap,
                [`-${this.color}`]: Boolean(this.color),
            };
        },
        wrapperClasses() {
            return {
                [`-responsive${typeof this.responsive === "boolean" ? '' : `-${this.responsive}`}`]: Boolean(this.responsive)
            }
        }
    }
};
