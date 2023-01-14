import { defineComponent } from 'vue';
import { memoize, markSearchString, MarkSearchStringPart } from '@inkline/inkline/helpers';

const memoizedMarkSearchString: typeof markSearchString = memoize(markSearchString) as any;

const componentName = 'IMark';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
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
        parts (): MarkSearchStringPart[] {
            return memoizedMarkSearchString(this.text, this.query);
        }
    }
});
