<script lang="ts">
import { defineComponent } from 'vue';
import { memoize, markSearchString, MarkSearchStringPart } from '@grozav/utils';

const memoizedMarkSearchString: typeof markSearchString = memoize(markSearchString) as any;

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
        parts (): MarkSearchStringPart[] {
            return memoizedMarkSearchString(this.text, this.query);
        }
    }
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