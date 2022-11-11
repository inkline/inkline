import { ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';

export interface ComponentSizeProps {
    componentName: string;
    currentSize?: string;
}

export function useComponentSize(props: ComponentSizeProps) {
    const inkline = useInkline();
    const sizeClass = ref(props.currentSize || 'md');

    if (!props.currentSize && inkline.options) {
        if (inkline.options.componentOptions[props.componentName]?.size) {
            sizeClass.value = inkline.options.componentOptions[props.componentName]?.size;
        } else if (inkline.options.size) {
            sizeClass.value = inkline.options.size;
        }
    }

    return sizeClass;
}
