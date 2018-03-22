<script>
export default {
    props: {
        clearable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isClearable () {
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
