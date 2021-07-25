import { memoize, markSearchString } from '@inkline/inkline/src/helpers';

const memoizedMarkSearchString = memoize(markSearchString);

const componentName = 'IMark';

export default {
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
};
