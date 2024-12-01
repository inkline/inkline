import type { Ref } from 'vue';
import { computed } from 'vue';
import { useInkline } from '@inkline/inkline/composables/useInkline';

export interface ComponentSizeProps {
    componentName: string;
    size: Ref<string | undefined>;
}

export function useComponentSize(props: ComponentSizeProps) {
    const inkline = useInkline();
    const size = computed(() => {
        let sizeClass = props.size.value || 'md';

        if (!props.size.value && inkline?.options) {
            if (inkline.options.componentOptions[props.componentName]?.size) {
                sizeClass = inkline.options.componentOptions[props.componentName]?.size;
            } else if (inkline.options.size) {
                sizeClass = inkline.options.size;
            }
        }

        return sizeClass;
    });

    return { size };
}
