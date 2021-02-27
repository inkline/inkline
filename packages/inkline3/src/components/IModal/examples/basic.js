export default {
    data() {
        return {
            visible: false
        };
    },
    watch: {
        visible(v) {
            console.log(v)
        }
    }
}
