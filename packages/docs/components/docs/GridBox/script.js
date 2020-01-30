export default {
    name: 'GridBox',
    props: {
        tall: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'primary'
        }
    },
    computed: {
        classes: function () {
            return [
                this.tall ? '-tall' : '',
                this.type ? `_background-${this.type}` : ''
            ];
        }
    }
};
