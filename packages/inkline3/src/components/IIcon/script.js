export default {
    name: 'IIcon',
    props: {
        /**
         * @description The icon to be displayed
         * @type String
         * @default
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * @description The size variant of the icon
         * @type sm | md | lg
         * @default md
         */
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        classes() {
            return {
                [`-${this.name}`]: Boolean(this.name),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
};
