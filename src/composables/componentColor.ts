import { ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';

export interface ComponentColorProps {
    componentName: string;
    currentColor?: string;
}

export function useComponentColor(props: ComponentColorProps) {
    const inkline = useInkline();
    const colorClass = ref(props.currentColor || 'light');

    if (!props.currentColor && inkline.options) {
        if (inkline.options.componentOptions[props.componentName]?.color) {
            colorClass.value = inkline.options.componentOptions[props.componentName]?.color;
        } else if (inkline.options.color) {
            colorClass.value = inkline.options.color;
        } else if (inkline.options.colorMode === 'system') {
            colorClass.value =
                typeof window !== 'undefined' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
        } else {
            colorClass.value = inkline.options.colorMode;
        }
    }

    return colorClass;
}
