import { computed, MaybeRef, unref } from 'vue';
import { useOptions } from './useOptions';

export function useComponentColor(componentName: string, color: MaybeRef<string | undefined>) {
    const { options } = useOptions();

    const resolvedColor = computed(() => {
        const colorPropValue = unref(color);
        if (!colorPropValue) {
            if (options.value.propsByComponentName[componentName]?.color) {
                return options.value.propsByComponentName[componentName].color;
            } else if (options.value.props.color) {
                return options.value.props.color;
            } else if (options.value.colorMode.preference === 'system') {
                return typeof window !== 'undefined' &&
                    window.matchMedia?.('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
            } else {
                return options.value.colorMode.preference;
            }
        }

        return colorPropValue || 'light';
    });

    return { color: resolvedColor };
}
