import { computed, MaybeRef, unref } from 'vue';
import { useOptions } from './useOptions';

export function useComponentSize(componentName: string, size: MaybeRef<string | undefined>) {
    const { options } = useOptions();

    const resolvedSize = computed(() => {
        const sizePropValue = unref(size);
        if (!sizePropValue) {
            if (options.value.propsByComponentName[componentName]?.size) {
                return options.value.propsByComponentName[componentName].size;
            } else if (options.value.props?.size) {
                return options.value.props.size;
            }
        }

        return sizePropValue || 'md';
    });

    return { size: resolvedSize };
}
