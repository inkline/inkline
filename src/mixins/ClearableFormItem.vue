<script>
export default {
    props: {
        clearable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Check whether the input is clearable. A form input is clearable if it has a set value, and it's
         * currently being focused or hovered.
         */
        isClearable () {
            console.log(this.clearable, this.currentValue !== '', (this.focused || this.hovered))
            return this.clearable && this.currentValue !== '' && (this.focused || this.hovered);
        }
    },
    methods: {
        clear () {
            this.model = '';
            this.$emit('clear');
            this.focus();
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider.push(() => ({
                '-clearable': this.custom
            }));
        }
    }
};
</script>
