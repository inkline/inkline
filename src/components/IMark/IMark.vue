<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { memoize, markSearchString, MarkSearchStringPart } from '@grozav/utils';

const componentName = 'IMark';

const memoizedMarkSearchString: typeof markSearchString = memoize(markSearchString) as any;

const props = defineProps({
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
});

const parts = computed<MarkSearchStringPart[]>(() => {
    return memoizedMarkSearchString(props.text, props.query);
});
</script>

<template>
    <span>
        <template v-for="{ text, marked } of parts">
            <mark v-if="marked">{{ text }}</mark>
            <template v-else>{{ text }}</template>
        </template>
    </span>
</template>
