import { ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';

export interface UseColorProps {
    componentName: string;
    currentColor?: string;
}

export function useColor(props: UseColorProps) {
    const { options } = useInkline();
    const colorClass = ref(props.currentColor ?? 'light');

    if (!props.currentColor && options) {
        if (options.componentOptions[props.componentName]?.color) {
            colorClass.value = options.componentOptions[props.componentName]?.color;
        } else if (options.color) {
            colorClass.value = options.color;
        } else if (options.colorMode === 'system') {
            colorClass.value =
                typeof window !== 'undefined' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
        } else {
            colorClass.value = options.colorMode;
        }
    }

    return colorClass;
}
