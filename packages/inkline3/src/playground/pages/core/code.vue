<template>
    <article>
        <h1>Code</h1>

        <example :component="Inline" />
        <example :component="Block" />
        <example :component="Variables" />
        <example :component="UserInput" />
        <example :component="SampleOutput" />
    </article>
</template>

<script>
import { markRaw } from 'vue';
import Inline from '@inkline/inkline/src/playground/pages/core/code/inline.vue';
import Block from '@inkline/inkline/src/playground/pages/core/code/block.vue';
import Variables from '@inkline/inkline/src/playground/pages/core/code/variables.vue';
import UserInput from '@inkline/inkline/src/playground/pages/core/code/user-input.vue';
import SampleOutput from '@inkline/inkline/src/playground/pages/core/code/sample-output.vue';

export default {
    setup() {
        return {
            Inline: markRaw(Inline),
            Block: markRaw(Block),
            Variables: markRaw(Variables),
            UserInput: markRaw(UserInput),
            SampleOutput: markRaw(SampleOutput),
        };
    }
}
</script>
