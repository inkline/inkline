import { ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';

export interface ComponentSizeProps {
    componentName: string;
    currentSize?: string;
}

export function useComponentSize(props: ComponentSizeProps) {
    const { options } = useInkline();
    const sizeClass = ref(props.currentSize ?? 'md');

    if (!props.currentSize && options) {
        if (options.componentOptions[props.componentName]?.size) {
            sizeClass.value = options.componentOptions[props.componentName]?.size;
        } else if (options.size) {
            sizeClass.value = options.size;
        }
    }

    return sizeClass;
}
