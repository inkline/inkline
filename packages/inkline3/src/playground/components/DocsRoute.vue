<template>
    <div>
        <component :is="content" />
    </div>
</template>
<script>
import { ref, defineAsyncComponent, markRaw, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'

export default {
    setup() {
        const route = useRoute();
        const content = ref(null);

        const getContent = () => {
            content.value = markRaw(defineAsyncComponent(() => import(`../../docs/${route.meta.path}/en.md`)));
        };

        watch(() => route.name, () => {
            getContent();
        });

        onMounted(getContent);

        return {
            content
        };
    }
}
</script>
