<script lang="ts" setup>
import { ref, markRaw } from 'vue';

const props = defineProps<{
    package: string;
    name: string;
}>();

const component = ref(null);

import(`@inkline/component-${props.package}/examples/${props.name}.vue`).then((module) => {
    component.value = markRaw(module.default);
});
</script>

<template>
    <Suspense>
        <Grid v-bind="$attrs" class="component-demo">
            <Component :is="component" :key="`${package}/${name}`" />
        </Grid>
    </Suspense>
</template>

<style>
.component-demo {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
</style>
