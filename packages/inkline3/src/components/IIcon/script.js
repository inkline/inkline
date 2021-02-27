export default {
    name: 'IIcon',
    props: {
        /**
         * @description The icon to be displayed
         * @type String
         * @default
         */
        icon: {
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
                [`-${this.icon}`]: Boolean(this.icon),
                [`-${this.size}`]: Boolean(this.size)
            };
        }
    }
};
