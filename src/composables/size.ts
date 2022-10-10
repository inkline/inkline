import { ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';

export interface UseSizeProps {
    componentName: string;
    currentSize?: string;
}

export function useSize(props: UseSizeProps) {
    const { options } = useInkline();
    const sizeClass = ref(props.currentSize ?? 'md');

    if (!props.currentSize && options) {
        if (options.options.componentOptions[props.componentName]?.size) {
            sizeClass.value = options.options.componentOptions[props.componentName]?.size;
        } else if (options.options.size) {
            sizeClass.value = options.options.size;
        }
    }

    return sizeClass;
}
