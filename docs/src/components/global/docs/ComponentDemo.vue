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
        <div>
            <Component :is="component" :key="`${package}/${name}`" />
            <slot mdc-unwrap="p" />
        </div>
    </Suspense>
</template>
