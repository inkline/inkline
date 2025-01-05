<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    tag?: string;
    size?: 'medium' | 'big';
    theme?: 'brand' | 'alt' | 'sponsor';
    text: string;
    href?: string;
    target?: string;
    rel?: string;
}

const props = defineProps<Props>();

function mapSizeProp(size: Props['size']) {
    return size === 'big' ? 'lg' : 'md';
}

const mappedProps = computed(() => {
    const { size, theme, text, target, ...remainingProps } = props;

    return {
        ...remainingProps,
        size: mapSizeProp(props.size)
    };
});
</script>
<template>
    <Button v-bind="mappedProps">{{ text }}</Button>
</template>
