<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        activeClass: {
            type: String,
            default: '-active'
        }
    },
    created () {
        if (this.classesProvider) {
            this.classesProvider['root'].push(() => ({
                '-active': this.active ? this.activeClass : false
            }));
        }
    }
};
</script>
