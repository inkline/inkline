<template>
    <div>
        <component :is="content" />
    </div>
</template>
<script>
import { ref, defineComponent, defineAsyncComponent, markRaw, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        const route = useRoute();
        const content = ref(null);

        const getContent = () => {
            content.value = markRaw(defineAsyncComponent(() => import(`../../components/${route.meta.component}/docs/en.md`)));
        };

        watch(() => route.name, () => {
            getContent();
        });

        onMounted(getContent);

        return {
            content
        };
    }
})
</script>
