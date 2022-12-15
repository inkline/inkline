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
        isClearable() {
            return this.clearable && this.currentValue !== '' && (this.focused || this.hovered);
        }
    },
    created() {
        this.classesProvider.add(() => ({
            '-clearable': this.clearable
        }));
    },
    methods: {
        clear() {
            this.$emit('clear');
            this.model = '';
            this.focusInputRef();
        }
    }
};
</script>
