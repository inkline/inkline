import type { Ref } from 'vue';
import { computed } from 'vue';
import { useInkline } from '@inkline/inkline/composables/useInkline';

export interface ComponentColorProps {
    componentName: string;
    currentColor: Ref<string | undefined>;
}

export function useComponentColor(props: ComponentColorProps) {
    const inkline = useInkline();
    const color = computed(() => {
        let colorClass = props.currentColor.value || 'light';

        if (!props.currentColor.value && inkline?.options) {
            if (inkline.options.componentOptions[props.componentName]?.color) {
                colorClass = inkline.options.componentOptions[props.componentName]?.color;
            } else if (inkline.options.color) {
                colorClass = inkline.options.color;
            } else if (inkline.options.colorMode === 'system') {
                colorClass =
                    typeof window !== 'undefined' &&
                    window.matchMedia?.('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light';
            } else {
                colorClass = inkline.options.colorMode;
            }
        }

        return colorClass;
    });

    return { color };
}
