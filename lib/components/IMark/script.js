import { defineComponent } from 'vue';
import { memoize, markSearchString } from '../../helpers';
const memoizedMarkSearchString = memoize(markSearchString);
const componentName = 'IMark';
export default defineComponent({
    name: componentName,
    props: {
        text: {
            type: String,
            default: ''
        },
        query: {
            type: String,
            default: ''
        }
    },
    computed: {
        parts() {
            return memoizedMarkSearchString(this.text, this.query);
        }
    }
});
//# sourceMappingURL=script.js.map