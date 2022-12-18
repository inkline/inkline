import { computed, Ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';

export interface ComponentSizeProps {
    componentName: string;
    currentSize: Ref<string | undefined>;
}

export function useComponentSize(props: ComponentSizeProps) {
    const inkline = useInkline();
    const size = computed(() => {
        let sizeClass = props.currentSize.value || 'md';

        if (!props.currentSize.value && inkline.options) {
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
