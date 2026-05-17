<script lang="ts" setup>
import { ref, markRaw } from 'vue';

const props = defineProps<{
    package: string;
    file: string;
}>();

const component = ref(null);

const componentName = props.package.replace('@inkline/component-', '');
const fileParts = props.file.split('/');
const fileName = fileParts[fileParts.length - 1].replace('.vue', '');

if (fileParts.length === 2) {
    import(`@inkline/component-${componentName}/examples/${fileName}.vue`).then((module) => {
        component.value = markRaw(module.default);
    });
} else {
    import(
        `@inkline/component-${componentName}/components/${fileParts[1]}/examples/${fileName}.vue`
    ).then((module) => {
        component.value = markRaw(module.default);
    });
}
</script>

<template>
    <Suspense>
        <Grid v-bind="$attrs" class="component-demo">
            <Component :is="component" :key="`${package}/${file}`" />
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

.component-demo > .card {
    max-width: 360px;
}
</style>
