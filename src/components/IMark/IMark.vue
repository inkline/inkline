<script lang="ts">
import { computed, defineComponent } from 'vue';
import { memoize, markSearchString, MarkSearchStringPart } from '@grozav/utils';

const componentName = 'IMark';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * String to be marked
         * @type String
         * @default ''
         * @name text
         */
        text: {
            type: String,
            default: ''
        },
        /**
         * Search string to use for marking
         * @type String
         * @default ''
         * @name query
         */
        query: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const memoizedMarkSearchString: typeof markSearchString = memoize(markSearchString) as any;

        const parts = computed<MarkSearchStringPart[]>(() => {
            return memoizedMarkSearchString(props.text, props.query);
        });

        return {
            parts
        };
    }
});
</script>

<template>
    <span v-bind="$attrs">
        <template v-for="(part, index) of parts" :key="index">
            <mark v-if="part.marked">{{ part.text }}</mark>
            <template v-else>{{ part.text }}</template>
        </template>
    </span>
</template>
